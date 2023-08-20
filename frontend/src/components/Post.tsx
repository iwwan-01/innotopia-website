import Image from 'next/image'

import { sanityClient } from '../lib/sanity.client'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'

// Shopstory Plugin
import { DemoShopstoryProvider } from '../shopstory/provider'
import { Shopstory, ShopstoryMetadataProvider } from '@shopstory/react'

function urlFor(source) {
  return imageUrlBuilder(sanityClient).image(source)
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <Image
          alt={value.alt || ' '}
          loading='lazy'
          src={urlFor(value)
            .width(600)
            .height(240)
            .fit('max')
            .auto('format')
            .url()}
        />
      )
    },
  },
}

const Post = ({ post, renderableContent, meta }) => {
  const {
    _id,
    title,
    mainImage,
    categories,
    name,
    authorImage,
    body,
    shopstoryRawContent,
  } = post

  return (
    <>
      <article>
        {title ? (
          <h1 className='text-3xl font-semibold my-2'>{title}</h1>
        ) : (
          <h1>Untitled</h1>
        )}
        {mainImage && (
          <div className='my-4'>
            <Image src={urlFor(mainImage).width(300).url()} alt={title} />
          </div>
        )}

        <p className='text-2xl'>Posted in</p>

        {categories && (
          <ul className='ml-2'>
            {categories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        )}

        <span className='text-xl font-light'>By {name}</span>

        {authorImage && (
          <div>
            <Image src={urlFor(authorImage).width(50).url()} alt={name} />
          </div>
        )}

        <PortableText value={body} components={ptComponents} />

        {shopstoryRawContent != null && (
          //@ts-ignore
          <DemoShopstoryProvider>
            <ShopstoryMetadataProvider meta={meta}>
              {renderableContent.map((renderableContent, index) => (
                <Shopstory content={renderableContent} key={index} />
              ))}
            </ShopstoryMetadataProvider>
          </DemoShopstoryProvider>
        )}
      </article>
    </>
  )
}

export default Post
