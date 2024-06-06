'use client'

import { Fragment } from 'react'
import { useCardZoomInOutStore } from '@/store/store'

import ZommInQuoteCard from '../card/ZoomInQuoteCard'
import CardTheme from '../../theme/CardTheme'
import UserQuoteList from '../list/UserQuoteList'
import Container from '../../common/container/Container'


interface PropsType {
  items: {
    quote_id: number
    author: string
    views: number
    quote: string
    job: string
    birth: string
    intro: string
  }[]
}


export default function UserQuoteContainer({ items }: PropsType) {

  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)

  return (
    <Container elementName={Fragment}>
      <CardTheme />
      <UserQuoteList items={items} />
      <ZommInQuoteCard item={items[cardIndex || 0]} />
    </Container>
  )
}
