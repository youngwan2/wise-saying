

import SearchQuoteList from "../SearchQuoteList";
import SearchResultMegContainer from "../container/SearchResultMegContainer";
import SearchNotFoundMessage from "../message/SearchNotFoundMeg";


interface PropsType {
  searchText: string
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
  onClickPageSwitch:(author:string, id:number )=> void
}

export default function ResultAuthorSection({ searchText, items, onClickPageSwitch }: PropsType) {

  const ItemsbyAuthorName = items.byAuthor ?? []
  const ResultCountByAuthor = ItemsbyAuthorName?.length ?? 0
  const authorResultTotal = items.byAuthorCount ?? 0
  const hasItemsByAuthorName = !!ResultCountByAuthor

  return (
    <section className="max-w-[680px] mx-auto my-[2em]">
      <SearchResultMegContainer
        messageInfo={{ title: '인물별', searchText: searchText || '', resultTotal: authorResultTotal, resultCurrentCount: ResultCountByAuthor }}
        containerClassName='border-b-[2px] border-[white] flex items-center justify-between text-white'>
      </SearchResultMegContainer>

      <SearchQuoteList
        splitQuotes={ItemsbyAuthorName}
        currentQuoteCount={ResultCountByAuthor}
        onClickPageSwitch={onClickPageSwitch}
      >
        <SearchNotFoundMessage hasItem={hasItemsByAuthorName} />
      </SearchQuoteList>
    </section>
  )
}