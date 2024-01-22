export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import WeekdayCategoryList from '@/components/UI/list/WeekdayCategoryList'
import { getCategoriesFromDb } from '@/api/data/get'
import { HiCalculator } from 'react-icons/hi'

export const metadata: Metadata = {
  title: '요일별 명언 | My wise saying',
  description: '요일 별 명언 상세 페이지 이동 전 요일 카테고리 페이지 입니다.',
}

export default async function DayPage() {
  const daysOfWeek = await getCategoriesFromDb('/api/items/days')
  const itemCount = daysOfWeek?.length || 0

  return (
    <section className="w-full">
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] ">
        요일별 명언({itemCount})
      </h2>
      <WeekdayCategoryList categories={daysOfWeek} />
    </section>
  )
}
