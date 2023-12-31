export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import WeekdayCategoryList from '@/components/UI/list/WeekdayCategoryList'
import { getWeekdayCategoryFromDB } from '@/services/item.get'
import { HiCalculator } from 'react-icons/hi'

export const metadata : Metadata = {
  title: "요일별 명언 | My wise saying",
  description: "요일 별 명언 상세 페이지 이동 전 요일 카테고리 페이지 입니다."
}

export default async function DayPage() {
  const daysOfWeek = await getWeekdayCategoryFromDB()

  return (
    <section className="w-full">
      <h2 className="flex items-center text-[1.5em] p-[10px] ">
        <span className="bg-[#ffae00] p-[1.5px] rounded-[5px] mx-[2px]">
          <HiCalculator color={'white'} />
        </span>
        요일별 명언
      </h2>
      <WeekdayCategoryList categories={daysOfWeek} />
    </section>
  )
}
