'use client'

import QuotesCategoryCard from './QuotesCategoryCard'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import LoadMoreButton from '../common/ListLoadMoreButton'
import { getCategoryCountFromDb } from '@/services/data/get'
import { useCallback, useEffect, useState } from 'react'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import { categoryClassifier } from '@/utils/commonFunctions'

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

  const MAX_PAGE = Math.ceil(totalCategoryCount / 15)

  useEffect(() => {
    getCategoryCount()
  }, [getCategoryCount])
  if(!isLoading) <ReplaceMessageCard childern="데이터를 불러오는 중입니다..." />
  if(!items)
    return <ReplaceMessageCard childern="조회된 데이터가 존재하지 않습니다." />
  if(items.length < 1)
    return <ReplaceMessageCard childern="데이터를 불러오는 중입니다.." />
  return (
    <>
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] perspective-500  ">
        {topick} 카테고리 ({currentCount}/{totalCategoryCount})
      </h2>
      <ul className="flex flex-wrap justify-center text-center min-h-[100vh]">
        {items.map((item: { category: string; job: string }, i) => {
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
