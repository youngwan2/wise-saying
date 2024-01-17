"use client"

import { HiUserGroup } from 'react-icons/hi'
import LoadMoreButton from '@/components/UI/button/LoadMoreButton'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import QuoteList from '@/components/UI/card/QuoteList'
import ReplaceMessageCard from '@/components/UI/card/ReplaceMessageCard'

interface PropsType {
  params: { category: string },
}

export default function AuthorPage({ params }: PropsType) {
  const pathName: string =  decodeURIComponent(params.category)
  const { items, size, setSize, isLastPage, isLoadingMore,itemCount } = useInfiniteScroll(pathName, 'users')
  if(!items) return <ReplaceMessageCard childern={<p>아이템을 조회중입니다. 잠시만 기다려 주세요.</p>}/>
  return (
    <section>
      <h2 className="flex items-center text-[1.5em] p-[5px] mb-[1em] ">
        <span className="bg-[gold] p-[1.5px] rounded-[5px] m-[10px]">
          <HiUserGroup />
        </span>
        {pathName} 명언({itemCount})
      </h2>
      <QuoteList items={items} />
      <LoadMoreButton size={size} setSize={setSize} isLastPage={isLastPage} isLoadingMore={isLoadingMore} />
    </section>
  )
}
