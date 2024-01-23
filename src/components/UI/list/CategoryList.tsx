'use client'
import CategoryCard from '../card/CategoryCard'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import LoadMoreButton from '../button/LoadMoreButton'

export default function CategoryList({
  categoryCount,
}: {
  categoryCount: number
}) {
  const {
    items,
    setSize,
    size,
    isLoadingMore,
    itemCount: currentCount,
  } = useInfiniteScroll('categories', '')
  const MAX_PAGE = Math.ceil(categoryCount / 15)

  return (
    <>
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] perspective-500  ">
        저자별 카테고리 ({currentCount}/{categoryCount})
      </h2>
      <ul className="flex flex-wrap justify-center text-center">
        {items.map((item: { category: string }) => {
          return <CategoryCard key={item.category} item={item} />
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
