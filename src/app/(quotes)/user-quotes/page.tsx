export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import UserCategoryList from '@/components/UI/list/UserCategoryList'
import { getCategoryUserFromDb } from '@/api/user/get'
import ReplaceMessageCard from '@/components/UI/card/ReplaceMessageCard'

export const metadata: Metadata = {
  title: '사용자 카테고리',
  description: '유저가 작성한 명언 목록을 볼 수 있는 페이지 입니다.',
}

export default async function UserPage() {
  const categories = await getCategoryUserFromDb('/api/quotes/users')
  console.log(categories)
  const itemCount = categories?.length || 0

  if (categories.length < 1)
    return <ReplaceMessageCard childern="데이터가 존재하지 않습니다." />
  return (
    <section className="w-full">
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] ">
        사용자 명언({itemCount})
      </h2>
      <UserCategoryList categories={categories} />
    </section>
  )
}
