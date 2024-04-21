'use client'

import styles from './Quotes.module.css'
import QuotesCategoryCard from './QuotesCategoryCard'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import LoadMoreButton from '../common/ListLoadMoreButton'
import { getCategoryCountFromDb } from '@/services/data/get'
import { useCallback, useEffect, useState } from 'react'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import { categoryClassifier } from '@/utils/common-func'
import Title from '../common/Title'

interface PropsType {
  category: string
}
export default function QuotesCategoryList({ category }: PropsType) {
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

  if (isLoading) return <ReplaceMessageCard childern="데이터를 불러오는 중입니다..." />
  if (!items) return <ReplaceMessageCard childern="조회된 데이터가 존재하지 않습니다." />
  return (
    <>
      <Title title={`${topick} 카테고리`} current={currentCount} total={totalCategoryCount} />
      <ul className={`${styles.grid_container}`}>
        {items.map((item: { category: string; job: string, birth:string }, i) => {
          return (
            <QuotesCategoryCard category={category} key={i} item={item} i={i} />
          )
        })}
      </ul>
      <LoadMoreButton
        onClick={() => setSize(size + 1)}
        size={size}
        isLoadingMore={isLoadingMore}
        maxPage={MAX_PAGE}
      />
    </>
  )
}
