export const dynamic = 'force-dynamic'

import WeekdayCategoryCard from '@/components/UI/WeekdayCategoryCard'
import { getWeekdayCategoryFromDB } from '@/services/item.services'
import { HiCalculator } from 'react-icons/hi'

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
      <WeekdayCategoryCard categories={daysOfWeek} />
    </section>
  )
}
