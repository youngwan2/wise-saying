import SearchQuoteCard from './SearchQuoteCard'

import type { QuoteType } from '@/types/items.types'

interface PropsType {
  children: React.ReactNode
  currentQuoteCount: number
  splitQuotes: QuoteType[]
  onClickPageSwitch: (author: string, id: number) => void
}
export default function SearchQuoteList({
  children,
  currentQuoteCount,
  splitQuotes,
  onClickPageSwitch,
}: PropsType) {
  return (
    <ul>
      {children}
      {currentQuoteCount >= 1 &&
        splitQuotes?.map((item) =>
          <SearchQuoteCard
            key={item.quote_id}
            item={item}
            onClick={() => onClickPageSwitch(item.author, item.quote_id)} />)}
    </ul>
  )
}
