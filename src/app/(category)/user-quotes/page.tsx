export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { getCategoriesFromDb } from '@/services/item.get'
import UserCategoryList from '@/components/UI/list/UserCategoryList'
import { HiUser } from 'react-icons/hi2'

export const metadata: Metadata = {
  title: '유저별 명언 | My wise saying',
  description: '유저가 작성한 명언 목록 페이지',
}

export default async function UserPage() {
  const categories = await getCategoriesFromDb('/api/items/users')
  const itemCount = categories?.length || 0

  return (
    <section className="w-full">
      <h2 className="flex items-center text-[1.5em] p-[10px]">
        <span className="bg-[#fbd15e] p-[1.5px] rounded-[5px] m-[10px] text-white">
          <HiUser color="white" />
        </span>
        사용자 명언({itemCount})
      </h2>
      <UserCategoryList categories={categories} />
    </section>
  )
}
