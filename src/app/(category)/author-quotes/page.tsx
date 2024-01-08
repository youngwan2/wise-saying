export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getItemFromDB } from '@/services/item.get'
import AuthorsCategoryCard from '@/components/UI/card/AuthorCategoryCard'
import { HiUserGroup } from 'react-icons/hi'


export const metadata:Metadata = {
  title:'저자별 명언 | My wise saying',
  description: "유명 위인별 명언 페이지에 접근하기 전의 카테고리 페이지 입니다."
}


export default async function AuthorPage() {
  const items = await getItemFromDB('authors')

  return (
    <section>
      <h2 className="flex items-center text-[1.5em] p-[10px]">
        <span className="bg-[#ffae00] p-[2.3px] rounded-[5px] mx-[2px]">
          <HiUserGroup color="white" />
        </span>
        인물별 명언
      </h2>
      <AuthorsCategoryCard items={items} />
    </section>
  )
}
