import { Metadata, RenderableContent, ShopstoryClient } from '@shopstory/core'
import { Shopstory, ShopstoryMetadataProvider } from '@shopstory/react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { sanityClient } from '../../lib/sanity.client'
import { shopstoryConfig } from '../../shopstory/config'
import { DemoShopstoryProvider } from '../../shopstory/provider'

type ShopstoryBlockPageProps = {
  renderableContent: RenderableContent
  meta: Metadata
}

const ShopstoryBlockPage: NextPage<ShopstoryBlockPageProps> = (props) => {
  return (
    <DemoShopstoryProvider>
      <ShopstoryMetadataProvider meta={props.meta}>
        <Shopstory content={props.renderableContent} />
      </ShopstoryMetadataProvider>
    </DemoShopstoryProvider>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<
  ShopstoryBlockPageProps,
  { entryId: string }
> = async (context) => {
  let { params, preview, locale = 'en' } = context

  if (!params) {
    return { notFound: true }
  }

  const rawContent = await fetchShopstoryContentJSONFromCMS(
    params.entryId,
    locale,
    !!preview
  )

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale,
    sanity: { preview },
  })
  const renderableContent = shopstoryClient.add(rawContent)
  const meta = await shopstoryClient.build()

  return {
    props: { renderableContent, meta },
    revalidate: 10,
  }
}

async function fetchShopstoryContentJSONFromCMS(
  entryId: string,
  locale: string,
  preview: boolean
): Promise<any> {
  const entryIdQuery =
    preview && !entryId.startsWith('drafts.') ? `drafts.${entryId}` : entryId

  const documents = await sanityClient.fetch(
    `*[_id == "${entryIdQuery}"]{"content": content.${locale}}`
  )

  if (documents.length === 0) {
    // Handle the case when no matching document is found
    // entryId = _id of the Shopstory Block inside Sanity Studio
    throw new Error('No matching document found')
  }

  return documents[0].content
}

export default ShopstoryBlockPage
