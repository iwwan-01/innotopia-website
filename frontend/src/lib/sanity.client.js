import { createClient } from '@sanity/client'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION
export const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion,
  token,
})
