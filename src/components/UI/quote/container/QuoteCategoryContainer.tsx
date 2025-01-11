'use client'

import useInfiniteScroll from '@/custom/swr/useInfiniteScroll'

import Title from '../../common/Title/Title'
import ReplaceMessageCard from '../../common/card/ReplaceMessageCard'
import LoadMoreButton from '../../common/button/ListLoadMoreButton'
import QuoteCategoryList from '../list/QuoteCategoryList'
import ErrorMessage from '../../message/ErrorMessage'

import { categoryClassifier } from '@/utils/common-func'


interface PropsType {
  category: "authors" | "topics" | "jobs"
  metadata: {
    maxPage: number
    totalCount: number
    totalLimit?: number
  }
}
export default function QuotesCategoryContainer({ category, metadata }: PropsType) {

  const selectedCategoryName = categoryClassifier(category) // 메인 카테고리 분류(저자, 주제, 직업)
  const selectedCategoryEnName =
    selectedCategoryName === '주제별'
      ? 'topics'
      : selectedCategoryName === '인물별'
        ? 'authors'
        : selectedCategoryName === '직업별'
          ? 'jobs'
          : 'users'

  //SWR INFINITE | 저자 목록을 가져온다.
  const {
    items,
    size,
    setSize,
    isLoadingMore,
    itemCount: currentCount,
    isLoading,
    error,
  } = useInfiniteScroll({ mainPath: selectedCategoryEnName, type: 'category' })

  if (error) return <ErrorMessage />
  if (isLoading || !items) return <ReplaceMessageCard>데이터를 불러오는 중입니다...</ReplaceMessageCard>
  return (
    <>
      <Title title={`${selectedCategoryName} 카테고리`} current={currentCount} total={metadata.totalCount} />
      <QuoteCategoryList items={items} />
      <LoadMoreButton
        onClick={() => setSize(size + 1)}
        size={size}
        isLoadingMore={isLoadingMore}
        maxPage={metadata.maxPage}
      />
    </>
  )
}
