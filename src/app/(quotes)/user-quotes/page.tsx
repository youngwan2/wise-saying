'use client'

import { useItemMetadataFetch } from '@/custom/useItemMetadataFetch'

import UserCategoryList from '@/components/UI/quote/list/UserQuotesCategoryList'
import ReplaceMessageCard from '@/components/UI/common/card/ReplaceMessageCard'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import ListLoadMoreButton from '@/components/UI/common/button/ListLoadMoreButton'
import Title from '@/components/UI/common/Title/Title'

export default function UserPage() {
  const { maxPage, totalCount } = useItemMetadataFetch(
    'users',
    'category-all',
    'users',
  )
  const {
    items: categories,
    itemCount,
    size,
    isLoadingMore,
    setSize,
  } = useInfiniteScroll('users', 'category-all')

  if (!categories)
    return (
      <ReplaceMessageCard childern="데이터가 존재하지 않습니다." />
    )
  if (categories.length < 1)
    return <ReplaceMessageCard childern="데이터를 불러오는 중 입니다." />
  return (
    <>
      <Title current={itemCount} total={totalCount} title='사용자 명언' />
      <UserCategoryList categories={categories} />
      <ListLoadMoreButton
        size={size}
        maxPage={maxPage}
        isLoadingMore={isLoadingMore}
        onClick={() => {
          setSize(size + 1)
        }}
      />
    </>
  )
}
