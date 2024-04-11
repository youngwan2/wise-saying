import type { UserQuotesType } from './MypageMyQuote'
import MypageUserQuoteCard from './MypageMyQuoteCard'



interface PropsType {
  userQuotes: UserQuotesType[]
  selectedMyQuotes : UserQuotesType[]
}

export default function MypageMyQuotesList({
  userQuotes,
  selectedMyQuotes,
}: PropsType) {
  return (
    <article className="mt-[6em] text-center min-h-[200px] px-[5px]">
      {(selectedMyQuotes.length > 0 ? selectedMyQuotes : userQuotes).map(
        (item,i) => {
          return <MypageUserQuoteCard key={item.quote_id} item={item} index={i} />
        },
      )}
    </article>
  )
}
