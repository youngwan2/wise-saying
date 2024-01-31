'use client'

import { useRef } from 'react'
import QuoteCard from './QuoteCard'
import ZommInQuoteCard from './ZoomInQuoteCard'
import { useCardZoomInOutStore } from '@/store/store'

interface PropsType {
  items: {
    id: number
    author: string
    quote: string,
    job: string
  }[]
}

export default function QuoteList({ items }: PropsType) {
  const ulRef = useRef<HTMLUListElement>(null)
  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)

  return (
    <>
      <ul
        ref={ulRef}
        className="mt-[1em] pt-[2em] w-full flex justify-center flex-wrap perspective-500 transform-style-3d"
      >
        {items.map((item, i) => {
          return <QuoteCard key={item.id} index={i} item={item} items={items} />
        })}
      </ul>
      <ZommInQuoteCard item={items[cardIndex || 0]} />
    </>
  )
}
