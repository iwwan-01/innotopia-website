import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'
import { SanityDocument } from '@sanity/client'
import { groq } from 'next-sanity'

// Live Preview
import { sanityClient } from '../../lib/sanity.client'
import Post from '../../components/Post'

// Shopstory Plugin
import { ShopstoryClient } from '@shopstory/core'
import { shopstoryConfig } from '../../../src/shopstory/config'

const PreviewPost = lazy(() => import('../../components/PreviewPost'))
const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title, 
  "name": author->name, 
  "categories": categories[] -> title, 
  "authorImage": author->image,
  mainImage,
  body,
  // Separate this part of the query a separate query!
  // Make use of context in getStaticProps and make sure that shopstoryConfig is set up correctly!
  "shopstoryRawContent": shopstoryBlock[] -> {
    "content": content
  }
  }`

/* IMPORTANT

getStaticProps and getStaticPaths work only in files in the pages folder
that are used for routing, i.e it will not be called for React components
that are included in these pages.

*/

/* GROQ syntax

• "*" 👈🏻 select all documents
• [_type == 'post' && slug.current == $slug] 👈🏻 filter the selection down
to documents with the type "post" and those of them who have the same slug
to that we have in the parameters
• [0] 👈🏻 select the first and only one in that list

*/

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params, preview = false }) => {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = params

  if (preview) {
    return { props: { preview, data: { params } } }
  }

  const post = await sanityClient.fetch(query, { slug })

  // Debug the response of the fetch
  // console.log(post)
  // Seems like we are able to fetch the content of a shopstoryBlock!

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale: 'en',
    sanity: { preview },
  })

  const renderableContent = shopstoryClient.add(
    // This seems to be valid input for shopstoryClient! - post.shopstoryRawContent[0].content.en
    post.shopstoryRawContent[0].content.en
  )
  const meta = await shopstoryClient.build()

  return {
    props: {
      preview,
      data: {
        post,
        params: {},
      },
      renderableContent,
      meta,
    },
  }
}

export default function Page({
  preview,
  data,
  renderableContent,
  meta,
}: {
  preview: Boolean
  data: { post: SanityDocument; params: {} }
  // Add type declarations for renderableContent and meta!
}) {
  return preview ? (
    <PreviewSuspense fallback='Loading...'>
      <PreviewPost query={query} params={data.params} />
    </PreviewSuspense>
  ) : (
    <>
      <Post
        post={data.post}
        renderableContent={renderableContent}
        meta={meta}
      />
    </>
  )
}
