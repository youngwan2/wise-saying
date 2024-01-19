'use client'

import { useRef } from 'react'
import QuoteCard from '../card/QuoteCard'
import ZommInQuoteCard from '../card/ZoomInQuoteCard'
import { useCardZoomInOutStore } from '@/store/store'

interface PropsType {
  items: {
    id: number
    author: string
    wise_sayings: string
  }[]
}

export default function QuoteList({ items }: PropsType) {

  const ulRef = useRef<HTMLUListElement>(null)
  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)

  return (
    <>
     
      <ul ref={ulRef} className="mt-[1em] pt-[2em] w-full flex justify-center max-h-[75vh] flex-wrap overflow-y-auto perspective-500 transform-style-3d h-[80vh] ">
        {items.map((item, i) => {
          return <QuoteCard item={item} index={i} key={item.id} items={items} />
        })}
       
      </ul>
      <ZommInQuoteCard item={items[cardIndex || 0]} />
    </>
  )
}
