'use client'

import UserCategoryList from '@/components/UI/quote/UserQuotesCategoryList'
import ReplaceMessageCard from '@/components/UI/common/ReplaceMessageCard'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import ListLoadMoreButton from '@/components/UI/common/ListLoadMoreButton'
import { useItemMetadataFetch } from '@/custom/useItemMetadataFetch'
import Title from '@/components/UI/common/Title'

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
      <ReplaceMessageCard childern="데이터를 불러오는 중 문제가 발생하였습니다. 나중에 다시시도 해주세요." />
    )
  if (categories.length < 1)
    return <ReplaceMessageCard childern="데이터를 불러오는 중입니다. 5초 이상 대기상태인 경우, 현재 추가된 게시글이 없는 상태 일 수 있습니다. 이 경우에는 포스트를 작성하고 다시 시도해주세요." />
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
