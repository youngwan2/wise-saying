export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getCategoriesFromDb } from '@/services/item.get'
import AuthorsCategoryList from '@/components/UI/list/AuthorCategoryList'
import { HiUserGroup } from 'react-icons/hi'

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
      <h2 className="flex items-center text-[1.5em] p-[10px]">
        <span className="bg-[#fbd15e] p-[1.5px] rounded-[5px] m-[10px] text-white">
          <HiUserGroup color="white" />
        </span>
        인물별 명언({itemCount})
      </h2>
      <AuthorsCategoryList items={categories} />
    </section>
  )
}
