"use client"

import { HiUserGroup } from 'react-icons/hi'
import LoadMoreButton from '@/components/UI/button/LoadMoreButton'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import QuoteList from '@/components/UI/card/QuoteList'
import ReplaceMessageCard from '@/components/UI/card/ReplaceMessageCard'
import {  HiCalendar } from 'react-icons/hi2'

interface PropsType {
  params: { id: string },
}

const DAYS = ['월','화','수','목','금','토','일']
export default function DayQuotesPage({ params }: PropsType) {
  const pathName: string =  decodeURIComponent(params.id)

  const { items, size, setSize, isLastPage, isLoadingMore, itemCount } = useInfiniteScroll(pathName, 'days')

  if(!items) return <ReplaceMessageCard childern={<p>아이템을 조회중입니다. 잠시만 기다려 주세요.</p>}/>
  return (
    <section className='h-[100vh]'>
      <h2 className="flex items-center text-[1.5em] p-[5px] mb-[1em] ">
        <span className="bg-[#ffa200] p-[1.5px] rounded-[5px] m-[10px]">
          <HiCalendar color='white' />
        </span>
        {DAYS[Math.max(Number(pathName)-1,0)]}요일 명언({itemCount})
      </h2>
      <QuoteList items={items} />
      <LoadMoreButton size={size} setSize={setSize} isLastPage={isLastPage} isLoadingMore={isLoadingMore} />
    </section>
  )
}
