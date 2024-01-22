export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { getCategoriesFromDb } from '@/api/data/get'
import UserCategoryList from '@/components/UI/list/UserCategoryList'

export const metadata: Metadata = {
  title: '유저별 명언 | My wise saying',
  description: '유저가 작성한 명언 목록 페이지',
}

export default async function UserPage() {
  const categories = await getCategoriesFromDb('/api/items/users')
  const itemCount = categories?.length || 0

  return (
    <section className="w-full">
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] ">
        사용자 명언({itemCount})
      </h2>
      <UserCategoryList categories={categories} />
    </section>
  )
}
