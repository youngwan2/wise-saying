"use client"

import CategoryCard from '../card/CategoryCard'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import LoadMoreButton from '../button/LoadMoreButton'
import { getCategoryCountFromDb } from '@/api/data/get'
import { useEffect, useState } from 'react'

export default function CategoryList() {

  const [totalCategoryCount, setTotalCategoryCount] = useState(0)

  async function getCategoryCount() {
    const count = await getCategoryCountFromDb('/api/quotes/authors/category-all?type=meta')
    setTotalCategoryCount(count)

  }

  // 저자 목록을 가져온다.
  const {
    items,
    setSize,
    size,
    isLoadingMore,
    itemCount: currentCount,
  } = useInfiniteScroll('authors', 'category-all')

  const MAX_PAGE = Math.ceil(totalCategoryCount / 15)

  useEffect(() => {
    getCategoryCount()
  }, [])

  return (
    <>
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] perspective-500  ">
        저자별 카테고리 ({currentCount}/{totalCategoryCount})
      </h2>
      <ul className="flex flex-wrap justify-center text-center">
        {items.map((item: { category: string, job: string }, i) => {
          return <CategoryCard key={i} item={item} i={i} />
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
