import { UserQuotesType } from '@/types/items.types'
import MypageUserQuoteCard from '../card/MypageMyQuoteCard'

interface PropsType {
  userQuotes: UserQuotesType[]
  selectedMyQuotes : UserQuotesType[]
}

export default function MypageMyQuotesList({
  userQuotes,
  selectedMyQuotes,
}: PropsType) {
  return (
    <article className="mt-[4em] text-center min-h-[200px] max-h-[500px] px-[5px] overflow-y-auto">
      {(selectedMyQuotes.length > 0 ? selectedMyQuotes : userQuotes).map(
        (item,i) => {
          return <MypageUserQuoteCard key={item.quote_id} item={item} index={i} />
        },
      )}
    </article>
  )
}
