import { getQuoteCategoryFromDb } from '@/services/data/get'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default async function sitemap(): Promise<
  {
    url: string
    lastModified?: string | Date | undefined
    changeFrequency?:
    | 'daily'
    | 'always'
    | 'hourly'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
    | undefined
    priority?: number | undefined
  }[]
> {
  const topics = await getQuoteCategoryFromDb('topics')
  const authors = await getQuoteCategoryFromDb('authors')

  const inCode = encodeURIComponent

  const topicEntries = topics.map((categoryInfo: { category: string }) => ({
    url: `${BASE_URL}/quotes/topics/${inCode(categoryInfo.category)}`,
    lastModified: new Date(),
  }))

  const authorEntries = authors.map((categoryInfo: { author: string }) => ({
    url: `${BASE_URL}/quotes/authors/${inCode(categoryInfo.author)}`,
    lastModified: new Date(),
  }))

  const userEntries = topics.map((categoryInfo: { category: string }) => ({
    url: `${BASE_URL}/user-quotes/${categoryInfo.category}`,
    lastModified: new Date(),
  }))

  const detailEntries = authors.map(
    (categoryInfo: { author: string; id: number }) => ({
      url: `${BASE_URL}/quotes/authors/${inCode(categoryInfo.author)}/${categoryInfo.id}`,
    }),
  )
  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/quotes/populars`,
      changeFrequency: 'always',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/quotes/topics`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quotes/authors`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/user-quotes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...topicEntries,
    ...authorEntries,
    ...userEntries,
    ...detailEntries,
  ]
}
