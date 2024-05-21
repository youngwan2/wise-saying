import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSimplePagination from '@/custom/useSimplePagination'

import SearchNotFoundMessage from '../message/SearchNotFoundMeg'
import SearchQuoteList from '../SearchQuoteList'
import SearchResultSwitchButton from './SearchPaginationContainer'
import ReplaceMessageCard from '../../common/card/ReplaceMessageCard'
import SearchResultMegContainer from './SearchResultMegContainer'

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
export default function SearchResultContainer({ items }: PropsType) {
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
    return <ReplaceMessageCard childern="데이터를 불러오는 중입니다." isFull />
  return (
    <section className="bg-[#e3dddd12] max-w-[730px] mx-auto rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] mt-[1.5em] p-[20px] hover:cursor-pointer">
      <SearchResultMegContainer
                messageInfo={{ title: '인물별', searchText: searchText || '', resultCurrentCount: totalCount }}
                containerClassName='border-b-[2px] border-[white] flex items-center justify-between text-white'
      >
      </SearchResultMegContainer>

      {/* 검색 결과 목록 */}
      <SearchQuoteList
        splitQuotes={splitQuotes}
        currentQuoteCount={currentQuoteCount}
        onClickPageSwitch={onClickPageSwitch}
      >
        <SearchNotFoundMessage hasItem={hasItem} />
      </SearchQuoteList>

      {/* 버튼 컨테이너 */}
      <SearchResultSwitchButton
        page={page}
        setPage={setPage}
        MAX_PAGE={MAX_PAGE}
      />
    </section>
  )
}
