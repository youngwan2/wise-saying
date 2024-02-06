'use client'
import LoadMoreButton from '@/components/UI/common/ListLoadMoreButton'
import useInfiniteScroll from '@/custom/useInfiniteScroll'
import QuoteList from '@/components/UI/quote/QuoteList'
import ReplaceMessageCard from '@/components/UI/common/ReplaceMessageCard'
import { useItemMetadataFetch } from '@/custom/useItemMetadataFetch'

interface PropsType {
  params: { category: string }
}

export default function UsersPage({ params }: PropsType) {
  const pathName: string = decodeURIComponent(params.category)

  const { items, size, setSize, isLoadingMore, itemCount } = useInfiniteScroll(
    'users', // 메인 카테고리
    pathName,
  )

  const { totalCount, maxPage } = useItemMetadataFetch('users', pathName, 'users')

  if (!items)
    return (
      <ReplaceMessageCard
        childern={<p>데이터를 불러오는 중입니다..</p>}
      />
    )
  if (items.length < 1) return <ReplaceMessageCard childern='조회된 데이터가 존재하지 않습니다.' />
  return (
    <>
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] my-[2em] ">
        {pathName} 명언({itemCount}/{totalCount})
      </h2>
      <QuoteList items={items} />
      <LoadMoreButton
        size={size}
        onClick={() => setSize(size + 1)}
        maxPage={maxPage}
        isLoadingMore={isLoadingMore}
      />
    </>
  )
}
