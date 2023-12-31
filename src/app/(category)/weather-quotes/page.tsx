export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import QuotesCard from '@/components/UI/card/QuotesCard'
import { getItemFromDB } from '@/services/item.get'
import { HiSun } from 'react-icons/hi'


export const metadata: Metadata = {
  title:'날씨 관련 명언/글귀 | My wise saying'
}

export default async function WeatherPage() {
  const items = await getItemFromDB('weathers')
  const itemCount = items.length
  return (
    <section>
      <h2 className="flex items-center text-[1.5em] p-[10px] ">
        <span className="bg-[#ffae00] p-[1.5px] rounded-[5px] mx-[2px]">
          <HiSun color={'white'} />
        </span>
        날씨 관련 명언/글귀({itemCount})
      </h2>

      <QuotesCard items={items} category='날씨' />
    </section>
  )
}
