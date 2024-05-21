'use client'

import { Fragment } from 'react'
import Container from '../../common/container/Container'
import TodayQuoteList from '../list/TodayQuoteList'

import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'

import { HiCalendarDays } from 'react-icons/hi2'


gsap.registerPlugin(TextPlugin)

export interface PropsType {
  quotes: {
    quote_id: number
    author: string
    quote: string
    job: string
    birth: string
    intro: string
  }[]
}

export default function TodayQuotelist({ quotes }: PropsType) {

  return (
    <Container elementName={Fragment}>
      <h2 className="sm:text-[1.5em] text-[1.35em] pl-[8px] flex items-center text-white max-w-[600px] mx-auto  mt-[5em] ">
        <HiCalendarDays className="mr-[5px]" /> 오늘의 명언
      </h2>
      <TodayQuoteList items={quotes}/>
    </Container>
  )
}
