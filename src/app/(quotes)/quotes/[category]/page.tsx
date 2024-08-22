export const dynamic = 'force-dynamic'

import QuoteCategoryContainer from '@/components/UI/quote/container/QuoteCategoryContainer'

import { Target, getQuoteMetadata } from '@/services/data/metadata/metadata'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: '카테고리',
  description: '명언 페이지에 접근하기 전의 카테고리 페이지 입니다.',
}


interface PropsType {
  params: { category: "authors" | "topics" | "jobs", name?: string }
}
export default async function CategoryPage({ params }: PropsType) {
  const { category } = params
  const type = category === 'topics' ? Target.QUOTE_TOPIC_CATEGORY_ALL : Target.QUOTE_AUTHOR_CATEGORY_ALL
  const metadata = await getQuoteMetadata({ type, totalLimit: 30 })

  if (!metadata) return null
  return <QuoteCategoryContainer category={category} metadata={metadata} />
}
