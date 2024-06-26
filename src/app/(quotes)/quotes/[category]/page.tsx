export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import QuoteCategoryContainer from '@/components/UI/quote/container/QuoteCategoryContainer'

export const metadata: Metadata = {
  title: '카테고리',
  description: '명언 페이지에 접근하기 전의 카테고리 페이지 입니다.',
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category } = params

  return <QuoteCategoryContainer category={category} />
}
