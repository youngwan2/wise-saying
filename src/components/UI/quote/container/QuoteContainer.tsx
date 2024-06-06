'use client'

import { useCardZoomInOutStore } from '@/store/store'

import ZommInQuoteCard from '../card/ZoomInQuoteCard'
import CardTheme from '../../theme/CardTheme'
import QuoteList from '../list/QuoteList'


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


export default function QuoteContainer({ items }: PropsType) {

  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)

  return (
    <>
      <CardTheme />
      <QuoteList items={items}/>
      <ZommInQuoteCard item={items[cardIndex || 0]} />
    </>
  )
}
