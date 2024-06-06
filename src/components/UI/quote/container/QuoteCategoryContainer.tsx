'use client'


import { useCallback, useEffect, useState } from 'react'
import useInfiniteScroll from '@/custom/useInfiniteScroll'

import Title from '../../common/Title/Title'
import ReplaceMessageCard from '../../common/card/ReplaceMessageCard'
import LoadMoreButton from '../../common/button/ListLoadMoreButton'
import QuoteCategoryList from '../list/QuoteCategoryList'

import { getCategoryCountFromDb } from '@/services/data/get'

import { categoryClassifier } from '@/utils/common-func'



interface PropsType {
  category: string
}
export default function QuotesCategoryContainer({ category }: PropsType) {
  const [totalCategoryCount, setTotalCategoryCount] = useState(0)

  const topick = categoryClassifier(category)

  const getCategoryCount = useCallback(async () => {
    const count =
      (await getCategoryCountFromDb(
        `/api/quotes/${category}/category-all?type=meta`,
      )) || 0
    setTotalCategoryCount(count)
  }, [category])

  //SWR INFINITE | 저자 목록을 가져온다.
  const {
    items,
    size,
    setSize,
    isLoading,
    isLoadingMore,
    itemCount: currentCount,
  } = useInfiniteScroll(`${category}`, 'category-all')

  const MAX_PAGE = Math.ceil(totalCategoryCount / 30)

  useEffect(() => {
    getCategoryCount()
  }, [getCategoryCount])

  if (isLoading) return <ReplaceMessageCard childern="데이터를 불러오는 중입니다..." isFull />
 
  if (!items || totalCategoryCount<1)
    return (
      <ReplaceMessageCard childern='데이터를 불러오는 중입니다.' isFull/>
    )
  return (
    <>
      <Title title={`${topick} 카테고리`} current={currentCount} total={totalCategoryCount} />
      <QuoteCategoryList items={items}/>
      <LoadMoreButton
        onClick={() => setSize(size + 1)}
        size={size}
        isLoadingMore={isLoadingMore}
        maxPage={MAX_PAGE}
      />
    </>
  )
}
