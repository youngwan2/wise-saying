'use client'

import { useRef } from 'react'
import ZommInQuoteCard from './ZoomInQuoteCard'
import { useCardZoomInOutStore } from '@/store/store'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import CardTheme from '../theme/CardTheme'
import UserQuoteCard from './UserQuoteCard'

interface PropsType {
  items: {
    quote_id: number
    author: string
    views:number
    quote: string
    job: string
    birth:string
    intro:string
  }[]
}


export default function UserQuoteList({ items }: PropsType) {
  const ulRef = useRef<HTMLUListElement>(null)
  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)

  return (
    <>
      <CardTheme />
      <ul
        ref={ulRef}
        className={`
        ${items.length < 2 ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}
        mt-[1em] pt-[2em] grid  md:grid-cols-2 grid-cols-1 place-content-center w-full perspective-500 transform-style-3d`}
      >
        {items.map((item, i) => {
          return <UserQuoteCard key={item.quote_id} index={i} item={item} items={items} />
        })}
      </ul>
      <ZommInQuoteCard item={items[cardIndex || 0]} />
    </>
  )
}
