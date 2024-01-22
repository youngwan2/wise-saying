export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getCategoriesFromDb } from '@/api/data/get'
import AuthorsCategoryList from '@/components/UI/list/AuthorCategoryList'

export const metadata: Metadata = {
  title: '인물별 명언 | My wise saying',
  description:
    '유명 위인별 명언 페이지에 접근하기 전의 카테고리 페이지 입니다.',
}

export default async function AuthorPage() {
  const categories = await getCategoriesFromDb('/api/items/authors')
  const itemCount = categories?.length || null

  return (
    <section>
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] ">
        인물별 명언({itemCount})
      </h2>
      <AuthorsCategoryList items={categories} />
    </section>
  )
}
