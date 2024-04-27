'use client'

import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
import useTTS from '@/custom/useTTS'
import { useRouter } from 'next/navigation'
import { HiCalendarDays } from 'react-icons/hi2'
import { useGSAP } from '@gsap/react'
import TodayQuoteCard from './TodayQuoteCard'

gsap.registerPlugin(TextPlugin)

export interface PropsType {
  quotes: {
    quote_id: number
    author: string
    quote: string
    job: string
    birth:string
    intro:string
  }[]
}

export default function TodayQuotelist({ quotes }: PropsType) {
  const { setText } = useTTS()
  const router = useRouter()


  useGSAP(() => {
    if (!quotes) return
    const tl = gsap.timeline()
    const textSplit = gsap.utils.toArray('.today-quote') as HTMLSpanElement[] || []
    textSplit.forEach((text,i) => {
      tl.from(text, {
        x:()=>{
          return 300
        },
        y:()=>{
          return i%2? -50 : 50
        },
        border:'2px solid black',
        opacity: 0,
        position:'absolute',
        ease: 'none',
      },'-=0.45')
    })
  }, [quotes])

  // 페이지 이동
  function onClickPush(author: string) {
    router.push(`/quotes/authors/${author}`)
  }

  // 명언듣기 텍스트 설정
  function onClickSetText(quote: string) {
    setText(quote)
  }


  return (
    <>
      <h2 className="sm:text-[1.5em] text-[1.35em] pl-[8px] flex items-center text-white max-w-[600px] mx-auto  mt-[5em] ">
        <HiCalendarDays className="mr-[5px]" /> 오늘의 명언
      </h2>
      <ul className="overflow-hidden mx-[10px]">
        {quotes.slice(0, 1).map((quote, i) => {
          return (
            <TodayQuoteCard
              key={quote.quote_id}
              quoteInfo={quote}
              onPush={() => onClickPush(quote.author)}
              onSetText={() => onClickSetText(quote.quote)}
            />
          )
        })}
      </ul>
    </>
  )
}
