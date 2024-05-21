import { useRouter, useSearchParams } from 'next/navigation'

import ResultAuthorSection from './section/ResultAuthorSection'
import ResultKeywordSection from './section/ResultKeywordSection'
import ReplaceMessageCard from '../common/card/ReplaceMessageCard'


interface PropsType {
  items: {
    byAuthor: {
      quote_id: number
      quote: string
      author: string
    }[]
    byKeyword: {
      quote_id: number
      quote: string
      author: string
    }[]
    byAuthorCount: number
    byKeywordCount: number
  }
}
export default function SearchResultAll({ items }: PropsType) {
  const searchText = useSearchParams().get('searchText') || ''
  const router = useRouter()


  function onClickPageSwitch(author: string, id: number) {
    router.push(`/quotes/authors/${author}/${id}?type=no-user`)
  }

  if (!items) return <ReplaceMessageCard childern="데이터를 불러오는 중입니다." isFull />
  return (
    <div className="bg-[#e3dddd12] max-w-[730px] mx-auto rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] p-[2px] px-[1em] mt-[1.5em]">
      {/* 인물별 */}
      <ResultAuthorSection searchText={searchText} items={items} onClickPageSwitch={onClickPageSwitch} />
      {/* 키워드 */}
      <ResultKeywordSection searchText={searchText} items={items} onClickPageSwitch={onClickPageSwitch} />
    </div>
  )
}
