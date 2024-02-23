import ReplaceMessageCard from '../common/ReplaceMessageCard'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchNotFoundMessage from './SearchNotFoundMeg'
import SearchResultMeg from './SearchResultMeg'
import SearchTapTitle from './SearchTapTitle'
import SearchQuoteList from './SearchQuoteList'

interface PropsType {
  items: {
    byAuthor: {
      id: number
      quote: string
      author: string
    }[]
    byKeyword: {
      id: number
      quote: string
      author: string
    }[]
    byAuthorCount: number
    byKeywordCount: number
  }
}
export default function SearchResultAll({ items }: PropsType) {
  const searchText = useSearchParams().get('searchText')
  const router = useRouter()

  if (!items)
    return <ReplaceMessageCard childern="데이터를 가져오는 중입니다." />

  const ItemsbyAuthorName = items.byAuthor ?? []
  const ItemsbyKeyword = items.byKeyword ?? []

  const ResultCountByAuthor = ItemsbyAuthorName?.length ?? 0
  const ResultCountByKeyword = ItemsbyKeyword?.length ?? 0

  const authorResultTotal = items.byAuthorCount ?? 0
  const keywordResultTotal = items.byKeywordCount ?? 0

  const hasItemsByAuthorName = !!ResultCountByAuthor
  const hasItemsByKeyword = !!ResultCountByKeyword

  function onClickPageSwitch(author: string, id: number) {
    router.push(`/quotes/authors/${author}/${id}`)
  }

  return (
    <>
      <section className="bg-[#e3dddd12] max-w-[730px] mx-auto rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] p-[2px] px-[1em] mt-[1.5em]">
        {/* 인물별 */}
        <article className="max-w-[680px] mx-auto my-[2em]">
          <article className="border-b-[2px] border-[white] flex items-center justify-between text-white">
            <SearchTapTitle title={'인물별'} />
            <SearchResultMeg
              searchText={searchText}
              resultTotal={authorResultTotal}
              resultCount={ResultCountByAuthor}
            />
          </article>

          <SearchQuoteList
            splitQuotes={ItemsbyAuthorName}
            currentQuoteCount={ResultCountByAuthor}
            onClickPageSwitch={onClickPageSwitch}
          >
            <SearchNotFoundMessage hasItem={hasItemsByAuthorName} />
          </SearchQuoteList>
        </article>

        {/* 키워드 */}
        <article className="max-w-[680px] mx-auto my-[2em]">
          <article className="border-b-[2px] border-[white] flex items-center justify-between text-white">
            <SearchTapTitle title={'키워드'} />
            <SearchResultMeg
              searchText={searchText}
              resultTotal={keywordResultTotal}
              resultCount={ResultCountByKeyword}
            />
          </article>
          <SearchQuoteList
            splitQuotes={ItemsbyKeyword}
            currentQuoteCount={ResultCountByKeyword}
            onClickPageSwitch={onClickPageSwitch}
          >
            <SearchNotFoundMessage hasItem={hasItemsByKeyword} />
          </SearchQuoteList>
        </article>
      </section>
    </>
  )
}
