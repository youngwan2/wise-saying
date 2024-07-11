import { UserQuotesType } from '@/types/items.types'
import MypageUserQuoteCard from '../card/MypageMyQuoteCard'

interface PropsType {
  userQuotes: UserQuotesType[]
}

export default function MypageMyQuotesList({
  userQuotes,
}: PropsType) {
  return (
    <article className="mt-[2em] text-center min-h-[200px] max-h-[500px] px-[5px] overflow-y-auto">
      {userQuotes.map(
        (item,i) => {
          return <MypageUserQuoteCard key={item.quote_id} item={item} index={i} />
        },
      )}
    </article>
  )
}
