'use client'

import { useRef } from 'react'
import QuoteCard from './QuoteCard'
import ZommInQuoteCard from './ZoomInQuoteCard'
import { useCardZoomInOutStore } from '@/store/store'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import CardTheme from '../theme/CardTheme'

interface PropsType {
  items: {
    id: number
    author: string
    quote: string
    job: string
  }[]
}


export default function QuoteList({ items }: PropsType) {
  const ulRef = useRef<HTMLUListElement>(null)
  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)


  if (items.length < 1)
    return <ReplaceMessageCard childern="데이터를 불러오는 중 입니다.." />
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
          return <QuoteCard key={item.id} index={i} item={item} items={items} />
        })}
      </ul>
      <ZommInQuoteCard item={items[cardIndex || 0]} />
    </>
  )
}
