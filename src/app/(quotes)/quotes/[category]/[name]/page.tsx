'use client'

import LoadMoreButton from '@/components/UI/common/ListLoadMoreButton'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import QuoteList from '@/components/UI/quote/QuoteList'
import ReplaceMessageCard from '@/components/UI/common/ReplaceMessageCard'
import { useItemMetadataFetch } from '@/custom/useItemMetadataFetch'

interface PropsType {
  params: {
    name: string
    category: string
  }
}

export default function AuthorPage({ params }: PropsType) {
  const { category: mainCategory, name: subCategory } = params

  const {
    items,
    size,
    setSize,
    isLoadingMore,
    itemCount: currnetItemCount,
  } = useInfiniteScroll(mainCategory, subCategory)

  const { totalCount, maxPage } = useItemMetadataFetch(
    mainCategory,
    subCategory,
    'authors'
  )

  if (!items)
    return (
      <ReplaceMessageCard
        childern={<p>아이템을 조회중입니다. 잠시만 기다려 주세요.</p>}
      />
    )
  return (
    <>
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] ">
        {decodeURIComponent(subCategory)}의 명언({currnetItemCount}/{totalCount}
        )
      </h2>
      <QuoteList items={items} />
      <LoadMoreButton
        size={size}
        onClick={() => setSize(size + 1)}
        maxPage={maxPage}
        isLoadingMore={isLoadingMore}
      />
    </>
  )
}
