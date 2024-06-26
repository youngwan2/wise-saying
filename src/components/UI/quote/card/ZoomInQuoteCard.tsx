

import { MouseEvent, useRef, useState } from 'react'
import { useCardZoomInOutStore } from '@/store/store'
import { useGSAP } from '@gsap/react'

import Overlay from '../overlay/Overlay'

import { gsap } from 'gsap/all'
import { Draggable } from 'gsap/Draggable'

import { type QuoteType } from '@/types/items.types'


interface PropsType {
  item: QuoteType
}
export default function ZommInQuoteCard({ item }: PropsType) {
  gsap.registerPlugin(Draggable)

  const {isZoomIn, setIsZoomIn} = useCardZoomInOutStore()
  const [position, setPosition] = useState({ x: 0, y: 0, xy: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLElement>(null)

  function onClickSetIsZoomIn() {
    setIsZoomIn(false)
  }

  // 카드 위치 지정
  function handleCardPosition(e: MouseEvent<HTMLDivElement>) {
    const { offsetX, offsetY } = e.nativeEvent
    const { width, height } = e.currentTarget.getBoundingClientRect() // 카드 넓이, 높이
    const offsetHalfWidth = (width - 100) / 2
    const offsetHalfHeight = (height - 100) / 2
    const x = (offsetX - offsetHalfWidth) / offsetHalfWidth // rotate x
    const y = (offsetY - offsetHalfHeight) / offsetHalfHeight // rotate y
    const xy = x * y // rotate z

    setPosition({ x, y, xy })
  }

  useGSAP(() => {
    if (cardRef.current && gsap) {

      const card = cardRef.current
      // 카드 확대 시
      if (isZoomIn) {
        const { x, y } = position
        gsap.to(card, {
          opacity: 1,
          lineHeight: 2,
          transformOrigin: '50% 50%',
          visibility: 'visible',
          scale: 1.15,
          translate: '-50%, -50%',
          top: '50%',
          rotateY: () => {
            return -y * 15
          },
          rotateZ: () => {
            return -x * y * 5
          },
          background: `linear-gradient(${-x * 360}deg, white, rgba(555,555,555,0.7) 80%)`,
          boxShadow: `${-x * 100}px ${-y * 100}px 10px 0 rgba(0,0,0,0.5)`,
          borderRadius: 5,
          duration: 0.1,
        })
      }

      // 카드 축소 시
      if (!isZoomIn) {
        gsap.to(card, {
          opacity: 0,
          visibility: 'hidden',
          translate: '-50%, -50%',
          top: '30%',
          delay: -1,
        })
      }
    }
  }, [isZoomIn, position])

  // 카드 줌 시 텍스트 렌더링 애니메이션
  useGSAP(() => {
    if (!isZoomIn) return

    const tl = gsap.timeline()
    const textSplits = gsap.utils.toArray('.zoomin-quote-split') as HTMLSpanElement[] || []

    // delay |  애니메이션 시작 1초 지연
    tl.delay(1)

    // animation | 각 텍스트 애니메이션 적용
    textSplits.forEach((text) => {

      tl.from(text, {
        position: 'relative',
        onUpdate: () => {
          gsap.to(text, { boxShadow: '0 -2px 0 inset rgba(0,0,0,0.3) ' })
        },
        onComplete: () => {
          gsap.to(text, { boxShadow: '0 -2px 0 inset rgba(0,0,0,0) ' })
        },
        opacity: 0.5,
      }, '-=0.43')
    })
  }, [isZoomIn])

  if (!item) return <></>
  return (
    <article
      ref={wrapperRef}
      className={` ${isZoomIn
        ? 'fixed left-0 top-0 bottom-0 right-0 visible opacity-100 z-50 '
        : 'fixed left-0 top-0 bottom-0 right-0 invisible opacity-0'
        } transition-all duration-1000`}
    >
      <Overlay isZoomIn={isZoomIn} onClickSetIsZoomIn={onClickSetIsZoomIn} />
      {/* 카드 */}
      <div
        aria-label="확대된 명언 카드"
        onClick={handleCardPosition}
        ref={cardRef}
        key={item.quote_id}
        className={`
                sm:p-[2.2em] p-[2em] sm:text-[1em] text-[0.95em]
                invisible opacity-0 z-[1000] fixed left-[50%] top-[30%] translate-x-[-50%] translate-y-[-50%]
                shadow-[1px_10px_5px_0_rgba(0,0,0,0.3)] odd:-rotate-2  even:rotate-2  max-w-[350px] bg-[#FFE5A0] 
                w-[100%] text-center delay-300 duration-100
                min-h-[260px]
                `}
      >
        <blockquote className="mt-[1em]">
          <p className=" p-[0.5em] text-">{item.quote.split('').map((quote, i) => {
            return <span key={i} className=' zoomin-quote-split relative opacity-100'>{quote}</span>
          })}</p>
          <footer className="font-bold mt-[1em]">{item.author}</footer>
        </blockquote>
      </div>
    </article>
  )
}
