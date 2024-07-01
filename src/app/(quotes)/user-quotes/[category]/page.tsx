'use client'

import { useItemMetadataFetch } from '@/custom/useItemMetadataFetch'
import useInfiniteScroll from '@/custom/useInfiniteScroll'

import ReplaceMessageCard from '@/components/UI/common/card/ReplaceMessageCard'
import LoadMoreButton from '@/components/UI/common/button/ListLoadMoreButton'
import Title from '@/components/UI/common/Title/Title'
import QuoteContainer from '@/components/UI/quote/container/QuoteContainer'

interface PropsType {
  params: { category: string }
}

export default function UsersPage({ params }: PropsType) {
  const pathName: string = decodeURIComponent(params.category)

  const { items, size, setSize, isLoadingMore, itemCount } = useInfiniteScroll(
    'users', // 메인 카테고리
    pathName,
  )

  const { totalCount, maxPage } = useItemMetadataFetch(
    'users',
    pathName,
    'users',
  )

  if (!items)
    return (
      <ReplaceMessageCard childern="데이터를 불러오는 중입니다." />
    )
  if (items.length < 1)
    return <ReplaceMessageCard childern="데이터가 존재하지 않습니다." />
  return (
    <>
      <Title current={itemCount} total={totalCount} title={pathName + ' 명언'} />
      <QuoteContainer items={items} />
      <LoadMoreButton
        size={size}
        onClick={() => setSize(size + 1)}
        maxPage={maxPage}
        isLoadingMore={isLoadingMore}
      />
    </>
  )
}
