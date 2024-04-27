import ReplaceMessageCard from '../common/ReplaceMessageCard'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchResultSwitchButton from './SearchPagination'
import { useState } from 'react'
import useSimplePagination from '@/custom/useSimplePagination'
import SearchTapTitle from './SearchTapTitle'
import SearchNotFoundMessage from './SearchNotFoundMeg'
import SearchQuoteList from './SearchQuoteList'

interface PropsType {
  items: {
    quotes: {
      quote_id: number
      quote: string
      author: string
    }[]
    totalCount: number
  }
}

export interface QuoteType {
  id: number
  quote: string
  author: string
}
export default function SearchResults({ items }: PropsType) {
  const searchText = useSearchParams().get('searchText')
  const router = useRouter()

  const [page, setPage] = useState(0)

  const { quotes, totalCount } = items ?? { quotes: [], totalCount: 0 }
  const [splitQuotes] = useSimplePagination(page, quotes)
  const MAX_PAGE = Math.ceil(totalCount / 5) || 1

  const currentQuoteCount = quotes?.length ?? 0
  const hasItem = currentQuoteCount < 1 ? false : true

  function onClickPageSwitch(author: string, id: number) {
    router.push(`/quotes/authors/${author}/${id}?type=no-user`)
  }

  if (!(items && quotes))
    return <ReplaceMessageCard childern="데이터를 불러오는 중입니다." isFull/>
  return (
    <article className="bg-[#e3dddd12] max-w-[730px] mx-auto rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] mt-[1.5em] p-[20px] hover:cursor-pointer">
      <div className="border-b-[2px] border-[white] flex items-center justify-between text-white">
        <SearchTapTitle title="인물별" />
        <span className="text-[14px]">
          <strong className="border-b-[1px] border-[tomato]">
            {searchText}
          </strong>{' '}
          (으)로 조회된 결과{' '}
          <b className="border-b-[1px] border-[tomato]">{totalCount}</b>건
        </span>
      </div>
      <ul>
        <SearchQuoteList
          splitQuotes={splitQuotes}
          currentQuoteCount={currentQuoteCount}
          onClickPageSwitch={onClickPageSwitch}
        >
          <SearchNotFoundMessage hasItem={hasItem} />
        </SearchQuoteList>
      </ul>
      {/* 버튼 컨테이너 */}
      <SearchResultSwitchButton
        page={page}
        setPage={setPage}
        MAX_PAGE={MAX_PAGE}
      />
    </article>
  )
}
