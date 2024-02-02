'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'
import { SlEarphones } from 'react-icons/sl'
import useTTL from '@/custom/useTTS'
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
  const [setText] = useTTL()
  const textRefs = useRef<HTMLParagraphElement[]>([])
  useLayoutEffect(() => {
    if (!textRefs.current) return

    const context = gsap.context(() => {
      textRefs.current.forEach((text, i) => {
        gsap.to(text, {
          text: quotes[i].quote, ease: 'expo', duration: 4
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
            <li className='hover:shadow-[inset_0_0_0_5px_white]  my-[1em] max-w-[600px] bg-[#ead977]  px-[15px] py-[35px] mx-auto shadow-[0_0_20px_5px_rgba(0,0,0,0.5)]  relative ' key={quote.id}>
              <button onClick={()=>{
                setText(quote.quote)
              }} className='absolute top-2 right-2 hover:border hover:border-[tomato] p-[5px]'><SlEarphones/> </button>
             <p ref={ref => ref && (textRefs.current[i] = ref)} className='text-[1.25em]'>{''}</p>
              <strong className='inline-block mt-[2em] mr-[1em] text-right w-full'>{quote.author}</strong>
              <div className='max-w-[100px] border-t-[20px] border-b-[20px] absolute  right-0 z-[1] top-0'></div>
            </li>
          )
        })}
        
      </ul>


    </>
  )
}
