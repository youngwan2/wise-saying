import { HiArchiveBoxXMark } from 'react-icons/hi2'
import ReplaceMessageCard from '../card/ReplaceMessageCard'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchResultSwitchButton from '../button/SearchResultSwitchButton'
import { useState } from 'react'
import useSimplePagination from '@/custom/useSimplePagination'

interface PropsType {
  items: {
    quotes: {
      id: number
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
export default function SearchResultListByAuthor({ items }: PropsType) {
  const searchText = useSearchParams().get('searchText')
  const router = useRouter()

  const [page, setPage] = useState(0)
  const { quotes, totalCount } = items ?? { quotes: [], totalCount: 0 }
  const currentQuoteCount = quotes?.length ?? 0
  const MAX_PAGE = Math.ceil(totalCount / 5) || 1

  const [splitQuotes] = useSimplePagination(page, quotes)

  if (!items && !quotes)
    return <ReplaceMessageCard childern="데이터를 가져오는 중입니다." />
  return (
    <article className="bg-[#e3dddd12] max-w-[730px] mx-auto rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] mt-[1.5em] p-[20px]">
      <div className="border-b-[2px] border-[white] flex items-center justify-between text-white">
        <h3 className=" py-[5px] text-[1.15em] ">
          <span className="text-[white] flex items-center  ">
            <HiArchiveBoxXMark className="mr-[3px]" /> 저자별 검색
          </span>
        </h3>
        <span aria-label="검색결과 안내 메시지" className="text-[14px]">
          <strong className="border-b-[1px] border-[tomato]">
            {searchText}
          </strong>{' '}
          로 조회된 결과{' '}
          <b className="border-b-[1px] border-[tomato]">{totalCount}</b>건 중
          상위{' '}
          <b className="border-b-[1px] border-[tomato]">{currentQuoteCount}</b>{' '}
          건{' '}
        </span>
      </div>
      <ul>
        {currentQuoteCount < 1 && (
          <p className="min-h-[50px] py-[10px] text-white">
            검색된 결과가 존재하지 않습니다.
          </p>
        )}
        {currentQuoteCount >=1 && splitQuotes?.map((item) => {
          return (
            <li
            onClick={() => {
              router.push(`/quotes/authors/${item.author}/${item.id}`)
            }}
              key={item.id}
              className="flex p-[5px] py-[10px] min-h-[50px] border-b-[1px] border-dashed text-white items-center hover:bg-[#ffffff3c]"
            >
              <p className="mr-[5px] w-[80%]">{item.quote}</p>
              <span className=" w-[20%]">{item.author}</span>
            </li>
          )
        })}
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
