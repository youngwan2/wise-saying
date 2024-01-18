"use client"

import { HiUserGroup } from 'react-icons/hi'
import LoadMoreButton from '@/components/UI/button/LoadMoreButton'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import QuoteList from '@/components/UI/list/QuoteList'
import ReplaceMessageCard from '@/components/UI/card/ReplaceMessageCard'
import { useItemMetadataFetch } from '@/custom/useItemMetadataFetch'

interface PropsType {
  params: { name: string },
}

export default function AuthorPage({ params }: PropsType) {
  const pathName: string = decodeURIComponent(params.name)

  const { items, size, setSize,  isLoadingMore, itemCount:currnetItemCount } = useInfiniteScroll(pathName, 'authors')
  const {totalCount, maxPage} = useItemMetadataFetch('authors',pathName)

  if (!items) return <ReplaceMessageCard childern={<p>아이템을 조회중입니다. 잠시만 기다려 주세요.</p>} />
  return (
    <section className='max-h-[80vh] relative'>
      <h2 className="flex items-center text-[1.5em] p-[5px] mb-[1em] ">
      <span className="bg-[#fbd15e] p-[1.5px] rounded-[5px] m-[10px] text-white">
          <HiUserGroup />
        </span>
        {pathName}의 명언({currnetItemCount}/{totalCount})
      </h2>
      <QuoteList items={items} />
      <LoadMoreButton size={size} setSize={setSize} maxPage={maxPage} isLoadingMore={isLoadingMore} />
    </section>
  )
}
