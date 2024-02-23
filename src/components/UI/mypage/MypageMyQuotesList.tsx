import MypageUserQuoteCard from './MypageMyQuoteCard'
import MypageNotFoundMessage from './MypageNotFoundMessage'

interface QuoteType {
  id: number
  quote: string
  author: string
  category: string
}

interface PropsType {
  userQuotes: QuoteType[]
  selectedMyQuotes: QuoteType[]
}

export default function MypageMyQuotesList({
  userQuotes,
  selectedMyQuotes,
}: PropsType) {

  // if (!userQuotes || userQuotes.length < 1) return <MypageNotFoundMessage />
  return (
      <ul className="mt-[3em] text-center min-h-[630px]">

        {(selectedMyQuotes.length > 0 ? selectedMyQuotes : userQuotes).map(
          (item) => {
            return <MypageUserQuoteCard key={item.id} item={item} />
          },
        )}
      </ul>
  )
}
