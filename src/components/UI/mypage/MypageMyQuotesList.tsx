import MypageUserQuoteCard from './MypageMyQuoteCard'

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
  return (
    <article className="mt-[3em] text-center min-h-[200px] px-[5px]">
      {(selectedMyQuotes.length > 0 ? selectedMyQuotes : userQuotes).map(
        (item) => {
          return <MypageUserQuoteCard key={item.id} item={item} />
        },
      )}
    </article>
  )
}
