import { useCardZoomInOutStore } from '@/store/store'
import { ItemsType } from '@/types/items.types'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap/all'
import { Draggable } from 'gsap/Draggable'

interface PropsType {
  item: ItemsType
}
export default function ZommInQuoteCard({ item }: PropsType) {
  gsap.registerPlugin(Draggable)

  const setIsZoomIn = useCardZoomInOutStore((state) => state.setIsZoomIn)
  const isZoomIn = useCardZoomInOutStore((state) => state.isZoomIn)
  const [position, setPosition] = useState({ x: 0, y: 0, xy: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const overlayDivRef = useRef<HTMLDivElement>(null)
  const wrapperDivRef = useRef<HTMLDivElement>(null)

  // 카드 위치 지정
  function setCardPosition(e: MouseEvent<HTMLDivElement>) {
    const { offsetX, offsetY } = e.nativeEvent

    const { width, height } = e.currentTarget.getBoundingClientRect() // 카드 넓이, 높이
    const x = (offsetX - width / 2) / (width / 2) // rotate x
    const y = (offsetY - height / 2) / (height / 2) // rotate y
    const xy = x * y // rotate z

    setPosition({ x, y, xy })
  }

  useEffect(() => {
    if (cardRef.current && gsap) {
      const card = cardRef.current
      if (isZoomIn) {
        const { x, y, xy } = position
        gsap.to(card, {
          opacity: 1,
          transformOrigin: '50% 100%',
          visibility: 'visible',
          scale: 1.25,
          translate: '-50%, -50%',
          top: '50%',
          rotateY: -y * 5,
          rotateZ: xy * 15,
          background: `linear-gradient(${
            -x * 360
          }deg, white, rgba(555,555,555,0.7) 80%  )`,
          boxShadow: `${-x * 100}px ${-y * 100}px 10px 0 rgba(0,0,0,0.5)`,
          borderRadius: 5,
          duration: 0.1,
        })
      }
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

  if (!item) return <span className="hidden"></span>
  return (
    <div
      ref={wrapperDivRef}
      className={` ${
        isZoomIn
          ? 'fixed left-0 top-0 bottom-0 right-0 visible opacity-100 '
          : 'fixed left-0 top-0 bottom-0 right-0 invisible opacity-0'
      } transition-all duration-1000`}
    >
      {/* 카드 오버레이 */}
      <div
        aria-label="카드 오버레이(카드의 뒷배경)"
        ref={overlayDivRef}
        onClick={() => {
          setIsZoomIn(false)
        }}
        className={`${
          isZoomIn
            ? ' backdrop-blur-[3px] z-[200] fixed left-0 top-0 right-0 bottom-0 bg-[#00000086] visible opacity-100'
            : 'invisible opacity-0'
        }  rounded-[10px]`}
      ></div>
      {/* 카드 */}
      <div
        aria-label="확대된 명언 카드"
        onClick={setCardPosition}
        ref={cardRef}
        key={item.id}
        className={`
                invisible opacity-0 scale-[1.25] z-[1000] fixed left-[50%] top-[30%] translate-x-[-50%] translate-y-[-50%]
                shadow-[1px_10px_5px_0_rgba(0,0,0,0.3)] p-[2.2em] odd:-rotate-2  even:rotate-2  max-w-[300px] bg-[#FFE5A0] 
                m-3 w-[100%] text-center delay-300 duration-300
                min-h-[260px]
                `}
      >
        <blockquote className="mt-[1em]">
          <p className=" p-[1em]">{item.quote}</p>
          <footer className="font-bold mt-[1em]">{item.author}</footer>
        </blockquote>
      </div>
    </div>
  )
}
