export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import CategoryList from '@/components/UI/quote/QuotesCategoryList'
import BackMoveButton from '@/components/UI/common/BackMoveButton'

export const metadata: Metadata = {
  title: '저자별 카테고리 | My wise saying',
  description:
    '유명 위인이나 유명 속담 등의 명언 페이지에 접근하기 전의 카테고리 페이지 입니다.',
}

export default async function CategoryPage() {
  return (
    <section>
      <BackMoveButton/>
      <CategoryList  />
    </section>
  )
}
