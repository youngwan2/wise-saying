'use client'

import { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import QuotesCardButton from '../button/QuotesCardButton'
import useIntersectionObserver from '@/custom/useIntersectionObserver'
import UserQuotesCardButton from '../button/UserQuotesCardButton'
import { usePathname, } from 'next/navigation'
import gsap from 'gsap/all'
import { useCardZoomInOutStore } from '@/store/store'
import ZommInQuoteCard from './ZoomInQuoteCard'


interface PropsType {
  category: string
  items: {
    id: number
    author: string
    wise_sayings: string
  }[]
}

export default function QuotesCard({ items, category }: PropsType) {
  const pathName = usePathname()
  const isZoomIn = useCardZoomInOutStore((state) => state.isZoomIn)
  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)
  const liRefs = useRef<HTMLLIElement[]>([])
  const ulRef = useRef<HTMLUListElement>(null)
  const setLiRefs = (index: number, element: HTMLLIElement | null) => {
    element instanceof HTMLLIElement && (liRefs.current[index] = element)
  }

  // 인터섹션 옵저버 적용하는 커스텀 훅
  useIntersectionObserver(liRefs)

  // 카드 확대
  const cardZoomInoutSwitch = useCallback((cardIndex: number | null =0, liRefs: MutableRefObject<HTMLLIElement[]>) => {
    if (liRefs.current) {
      if (isZoomIn && cardIndex) {
        gsap.to(liRefs.current[cardIndex], { visibility: 'hidden', opacity: 0, translateY: -50, translateZ: 15 })
      }
      if (!isZoomIn && cardIndex) {
        gsap.to(liRefs.current[cardIndex], { visibility: 'visible', opacity: 1, translateY: 0 })
      }
    }
  }, [isZoomIn])

  useEffect(() => {
    cardZoomInoutSwitch(cardIndex, liRefs)
  }, [cardIndex, cardZoomInoutSwitch])

  if (!items) return <h2>로딩중 입니다..</h2>
  return (
    <>

      <ul ref={ulRef} className="mt-[3em] w-full flex justify-center max-h-[80vh] flex-wrap overflow-y-auto perspective-500 transform-style-3d ">
        {items?.map((item, i) => {
          return (
            <li
              draggable={true}
              ref={(element) => {
                setLiRefs(i, element)
              }}
              key={item.id}
              className={`group
                shadow-[1px_10px_5px_0_rgba(0,0,0,0.3)] p-[2em] odd:-rotate-2  even:rotate-2  max-w-[280px] bg-[#FFE5A0] 
                m-3 w-[100%] text-center transition-all duration-700 hover:shadow-[-1px_20px_10px_0_rgba(0,0,0,0.5)] hover:translate-y-[-20px]
                min-h-[250px] hover:cursor-pointer
                `}
            >
              <span className='absolute left-2 top-2'>{item?.id}</span>
              <blockquote className='mt-[1em]'>
                <p className=' p-[1em]'>{item?.wise_sayings}</p>
                <footer className="font-bold mt-[1em]">{item?.author}</footer>
              </blockquote>
              <div className="w-[20px] h-[45px] bg-[rgba(247,123,123,0.7)] absolute top-[-1em] right-1 rotate-45"></div>

              {pathName.includes('/user-quotes')
                ? <UserQuotesCardButton index={i} item={item} items={items} />
                : <QuotesCardButton index={i} itemId={item.id} items={items} category={category} />}
            </li>
          )
        })}
      </ul>
      <ZommInQuoteCard item={items[cardIndex || 0]} />
    </>
  )
}
