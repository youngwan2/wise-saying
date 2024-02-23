'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'
import { SlEarphones } from 'react-icons/sl'
import useTTS from '@/custom/useTTS'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import { useRouter } from 'next/navigation'
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(TextPlugin)

interface PropsType {
  quotes: {
    id: number
    author: string
    quote: string
  }[]
}

export default function TodayQuotelist({ quotes }: PropsType) {
  const { setText } = useTTS()
  const textRefs = useRef<HTMLParagraphElement[]>([])
  const router = useRouter()

  useLayoutEffect(() => {
    if (!textRefs.current) return

    const context = gsap.context(() => {
      if (!quotes) return
      const tl = gsap.timeline()
      textRefs.current.forEach((text, i) => {
        tl.set(text, { transformOrigin: '0 50%' })
        tl.to(text, {
          scale: 1,
          text: {
            value: quotes[i].quote,
            speed: 1.2,
          },
          ease: 'none',
        })
      })
    })

    return () => context.revert()
  }, [quotes])

  if (!quotes)
    return <ReplaceMessageCard childern="데이터를 불러오는 중입니다.." />
  return (
    <>
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] mt-[2em] mb-[1em] ">
        오늘의 명언
      </h2>

      <ul className=" mt-[4em] t overflow-hidden mx-[10px]">
        {quotes.map((quote, i) => {
          return (
            <li
              className="shadow-[inset_0_0_0_3px_white] rounded-[10px]  my-[1em] max-w-[600px] bg-transparent  px-[15px] py-[35px] mx-auto relative hover:bg-[#d5d5d533] "
              key={quote.id}
            >
              {/* 명언 듣기 버튼 */}
              <button
                aria-label="명언 듣기"
                onClick={() => {
                  setText(quote.quote)
                }}
                className="absolute top-2 right-2 hover:border hover:border-[tomato] text-white p-[5px]"
              >
                <SlEarphones />
              </button>
              {/* 명언 */}
              <p
                ref={(ref) => ref && (textRefs.current[i] = ref)}
                className="sm:text-[1.25em] text-[1.1em] mt-[0.5em] text-white"
              >
              </p>
              {/* 저자 */}
              <strong
                onMouseEnter={() => {
                  router.prefetch(`/quotes/authors/${quote.author}`)
                }}
                onClick={() => {
                  router.push(`/quotes/authors/${quote.author}`)
                }}
                className="inline-block mt-[2em] mr-[1em] text-white text-right w-full hover:text-[tomato] hover:cursor-pointer"
              >
                {quote.author}
              </strong>
              <div className="max-w-[100px] border-t-[20px] border-b-[20px] absolute  right-0 z-[1] top-0"></div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
