'use client'

import useInfiniteScroll from '@/custom/useInfiniteScroll'

import QuoteContainer from '@/components/UI/quote/container/QuoteContainer'
import LoadMoreButton from '@/components/UI/common/button/ListLoadMoreButton'
import ReplaceMessageCard from '@/components/UI/common/card/ReplaceMessageCard'
import Title from '@/components/UI/common/Title/Title'
import ErrorMessage from '@/components/UI/message/ErrorMessage'


interface PropsType {
  params: {
    name: string
    category: "users" | "topics" | "authors"
    birth: string
    intro: string
  }
  metadata: {
    maxPage: number
    totalCount: number
  }
}

export default function AuthorQuotePageContainer({ params, metadata }: PropsType) {

  const { category: mainPath, name: subPath } = params

  const {
    items,
    size,
    setSize,
    isLoadingMore,
    itemCount: currentItemCount,
    isLoading,
    error
  } = useInfiniteScroll({ mainPath, subPath,type:'quote' })


  if (error) return <ErrorMessage />
  if (isLoading || !items) return <ReplaceMessageCard children='데이터를 조회중 입니다...' />
  return (
    <>
      <Title title={`${decodeURIComponent(subPath)} 명언`} current={currentItemCount} total={metadata.totalCount} />
      <QuoteContainer items={items} />
      <LoadMoreButton
        size={size}
        onClick={() => setSize(size + 1)}
        maxPage={metadata.maxPage}
        isLoadingMore={isLoadingMore}
      />
    </>
  )
}
