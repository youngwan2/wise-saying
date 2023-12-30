
import type { Metadata } from 'next'
import { HiCalendar } from 'react-icons/hi'
import WeekdayQuotesCard from '@/components/UI/card/WeekdayQuotesCard'
import { getWiseSayingByDay } from '@/services/item.services'


type MetadataPropsType = {
  params : {id: string}
}
const weekdayList = ['월', '화', '수', '목', '금', '토', '일']

//메타 데이터
export async function generateMetadata({
  params
}: MetadataPropsType):Promise<Metadata> {

  const { id} = params

  return {
    title: weekdayList[Math.max(Number(id)-1,0)]+ " | My wise saying",
    description: `${weekdayList[Math.max(Number(id)-1,0)]}요일에 읽으면 좋은 명언들을 모아놓은 페이지 입니다.`
    
  }
  
}

// 페이지
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const items = await getWiseSayingByDay(id)
  const itemCount =items.length


  return (
    <section>
      <h2 className="text-[1.5em] flex items-center p-5">
        <span className="bg-[#ebbb72] p-[2px] mr-[5px]">
          <HiCalendar color="white" />
        </span>
        {weekdayList[Math.max(Number(id) - 1, 0)]}({itemCount})
      </h2>

      <WeekdayQuotesCard items={items} />
    </section>
  )
}
