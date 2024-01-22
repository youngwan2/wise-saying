'use client'

import LoadMoreButton from '@/components/UI/button/LoadMoreButton'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import QuoteList from '@/components/UI/list/QuoteList'
import ReplaceMessageCard from '@/components/UI/card/ReplaceMessageCard'
import { useItemMetadataFetch } from '@/custom/useItemMetadataFetch'

export default function WeatherPage({
  params,
}: {
  params: { category: string }
}) {
  const pathName: string = decodeURIComponent(params.category)
  const { items, size, setSize, isLoadingMore, itemCount } = useInfiniteScroll(
    pathName,
    'etc',
  )
  const { totalCount, maxPage } = useItemMetadataFetch('etc', pathName)

  if (!items)
    return (
      <ReplaceMessageCard
        childern={<p>아이템을 조회중입니다. 잠시만 기다려 주세요.</p>}
      />
    )
  return (
    <section className="h-[100vh]">
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] ">
        {pathName} 명언({itemCount}/{totalCount})
      </h2>
      <QuoteList items={items} />
      <LoadMoreButton
        size={size}
        setSize={setSize}
        maxPage={maxPage}
        isLoadingMore={isLoadingMore}
      />
    </section>
  )
}
