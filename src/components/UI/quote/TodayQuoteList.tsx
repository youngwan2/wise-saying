'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'
import { SlEarphones } from 'react-icons/sl'
import useTTS from '@/custom/useTTS'
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
  const [setText] = useTTS()
  const textRefs = useRef<HTMLParagraphElement[]>([])
  useLayoutEffect(() => {
    if (!textRefs.current) return

    const context = gsap.context(() => {
      const tl = gsap.timeline()
      textRefs.current.forEach((text, i) => {
        tl.set(text, { bg: 0, transformOrigin: '0 50%' })
        tl.to(text, {
          scale: 1,
          text: quotes[i].quote, ease: 'none', duration: 4
        })
      })
    })

    return () => context.revert();
  }, [quotes])
  return (
    <>
      <h2 className="flex justify-center items-center text-[1.5em] p-[10px]  text-center text-white max-w-[250px] mx-auto bg-gradient-to-b from-[transparent] to-[#00000033]  shadow-[0_9px_2px_0_rgba(0,0,0,0.5)] rounded-[5px] mt-[2em] mb-[1em] ">
        오늘의 명언
      </h2>

      <ul className=" mt-[4em] t overflow-hidden mx-[10px]" >
        {quotes.map((quote, i) => {
          return (
            <li className='shadow-[inset_0_0_0_3px_white] rounded-[10px]  my-[1em] max-w-[600px] bg-transparent  px-[15px] py-[35px] mx-auto relative hover:bg-[#d5d5d533] ' key={quote.id}>
              <button onClick={() => {
                setText(quote.quote)
              }} className='absolute top-2 right-2 hover:border hover:border-[tomato] text-white p-[5px]'><SlEarphones /> </button>
              <p ref={ref => ref && (textRefs.current[i] = ref)} className='text-[1.25em] text-white'>{''}</p>
              <strong className='inline-block mt-[2em] mr-[1em] text-white text-right w-full'>{quote.author}</strong>
              <div className='max-w-[100px] border-t-[20px] border-b-[20px] absolute  right-0 z-[1] top-0'></div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
