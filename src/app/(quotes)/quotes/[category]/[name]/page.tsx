'use client'

import LoadMoreButton from '@/components/UI/common/ListLoadMoreButton'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import QuoteList from '@/components/UI/quote/QuoteList'
import ReplaceMessageCard from '@/components/UI/common/ReplaceMessageCard'
import { useItemMetadataFetch } from '@/custom/useItemMetadataFetch'
import Title from '@/components/UI/common/Title'


interface PropsType {
  params: {
    name: string
    category: string
    birth:string
    intro:string
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
    'authors',
  )

  if (!items)
    return (
      <ReplaceMessageCard/>
    )

  return (
    <>
    <Title title={`${decodeURIComponent(subCategory)} 명언`} current={currnetItemCount} total={totalCount}/>
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
