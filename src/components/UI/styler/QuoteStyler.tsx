'use client'

import { HiOutlineArrowCircleLeft } from 'react-icons/hi'
import QuotesStylerCanvas from './QuotesStylerCanvas'
import QuotesTextStyler from './QuotesTextStyler'
import QuotesImageStyler from './QuotesImageStyler'
import { useRouter } from 'next/navigation'
import QuotesSizeStyler from './QuotesSizeStyler'
import QuotesBackgroundStyler from './QuotesBackgorundStyler'
import { useEffect, useRef, useState } from 'react'
import QuotesStylerTaps from '../tap/QuotesStylerTaps'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

export default function QuoteStyler() {
  const router = useRouter()
  const [selecTapNum, setSelectTapNum] = useState(0)

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (closeButtonRef.current) {
      gsap.registerPlugin(Draggable)

      setTimeout(() => {
        Draggable.create(closeButtonRef.current, {
          bounds: document.querySelector('body'),
          dragClickables: true,
        })
      }, 2000)
    }
  })

  return (
    <div
      className={
        ' opacity-[100%] visible left-0 right-0 top-0 bottom-0 rounded-[10px] bg-[transparent] backdrop-blur-[5px] my-[2em] '
      }
    >
      <button
        ref={closeButtonRef}
        onClick={() => {
          router.back()
        }}
        className="fixed left-2 top-[0.8em] text-[2.5em]"
      >
        <HiOutlineArrowCircleLeft color="gold" />
      </button>

      <section className="flex flex-col justify-center w-full p-[2em] mt-[2em] lg:flex-row lg:min-h-[90vh]">
        <article className="flex flex-col items-center w-full overflow-x-hidden mr-[1em] bg-[#dad6d614]  rounded-[1em] shadow-[inset_-3px_-3px_5px_rgba(0,0,0,0.5)] p-[1em] ">
          {/* 메인 캔버스 */}
          <QuotesStylerCanvas />
          {/* 명언 배경 이미지 */}
          <QuotesImageStyler />
        </article>

        {/* 우측  */}
        <article className="mt-[2em] w-full flex flex-col max-w-[100%] lg:max-w-[25%] lg:block p-[0.8em] lg:mt-[0] bg-[#dad6d614] rounded-[1em] shadow-[inset_-3px_-3px_5px_rgba(0,0,0,0.5)] min-h-[400px]  ">
          <QuotesStylerTaps
            selectTapNum={selecTapNum}
            setSelectTapNum={setSelectTapNum}
          />
          {/* 명언 글자 편집 */}
          <QuotesTextStyler selectTapNum={selecTapNum} />
          {/* 카드 배경 편집 */}
          <QuotesBackgroundStyler selectTapNum={selecTapNum} />
          {/* 명언 카드 크기 편집 */}
          <QuotesSizeStyler selectTapNum={selecTapNum} />
        </article>
      </section>
    </div>
  )
}
