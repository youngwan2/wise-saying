import SearchQuoteList from "../SearchQuoteList"
import SearchResultMegContainer from "../container/SearchResultMegContainer"
import SearchNotFoundMessage from "../message/SearchNotFoundMeg"

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
  
  
export default function ResultKeywordSection({searchText, items , onClickPageSwitch}:PropsType) {

    const ItemsbyKeyword = items.byKeyword ?? []
    const ResultCountByKeyword = ItemsbyKeyword?.length ?? 0
    const keywordResultTotal = items.byKeywordCount ?? 0
    const hasItemsByKeyword = !!ResultCountByKeyword
return (
    <section className="max-w-[680px] mx-auto my-[2em]">
    <SearchResultMegContainer
      messageInfo={{ title: '키워드별', searchText: searchText || '', resultTotal: keywordResultTotal, resultCurrentCount: ResultCountByKeyword }}
      containerClassName='border-b-[2px] border-[white] flex items-center justify-between text-white'>
    </SearchResultMegContainer>

    <SearchQuoteList
      splitQuotes={ItemsbyKeyword}
      currentQuoteCount={ResultCountByKeyword}
      onClickPageSwitch={onClickPageSwitch}
    >
      <SearchNotFoundMessage hasItem={hasItemsByKeyword} />
    </SearchQuoteList>
  </section>
)}