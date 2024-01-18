import { useCallback, useEffect, useRef } from "react"
import QuotesCardButton from "../button/QuotesCardButton"
import UserQuotesCardButton from "../button/UserQuotesCardButton"
import useIntersectionObserver from "@/custom/useIntersectionObserver"
import { useCardZoomInOutStore } from "@/store/store"
import { usePathname } from "next/navigation"
import { ItemsType } from "@/types/items.types"
import ReplaceMessageCard from "./ReplaceMessageCard"
import gsap from "gsap/all"


interface PropsType {
  item: ItemsType
  items: ItemsType[]
  index: number
}

const category = "인물"

export default function QuoteCard({ item, items, index }: PropsType) {
  const liRefs = useRef<HTMLLIElement[]>([])
  const pathName = usePathname()
  const isZoomIn = useCardZoomInOutStore((state) => state.isZoomIn)
  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)

  const setLiRefs = (index: number, element: HTMLLIElement | null) => {
    element instanceof HTMLLIElement && (liRefs.current[index] = element)
  }

  // 인터섹션 옵저버 적용하는 커스텀 훅
  useIntersectionObserver(liRefs)

  // 카드 확대
  const cardZoomInoutSwitch = useCallback((target: HTMLLIElement) => {

    // 줌 인(확대)
    if (isZoomIn) {
      gsap.to(target, { visibility: 'hidden', opacity: 0, translateY: -50, translateZ: 15 })
    }

    // 줌 아웃(축소)
    if (!isZoomIn) {
      gsap.to(target, { visibility: 'visible', opacity: 1, translateY: 0 })
    }
  }, [isZoomIn])


  useEffect(() => {
    if (liRefs.current[cardIndex] === undefined) return
    if (liRefs.current.length > 0 && cardIndex >= 0) {
      const liEl = liRefs.current[cardIndex]
      cardZoomInoutSwitch(liEl)
    }
  }, [cardIndex, cardZoomInoutSwitch])


  if (!item) return <ReplaceMessageCard childern={<p>아이템을 조회중입니다. 잠시만 기다려주세요.</p>} />
  return (
    <li
      ref={(element) => {
        if (typeof index === 'number' && element instanceof HTMLLIElement) {
          setLiRefs(index, element)
        }
      }}
      key={item.id}
      className={`
                text-[1.15em]
                group
                p-[1.5em] my-[1em] m-3 w-[100%] max-h-[600px]  max-w-[330px] min-h-[250px] bg-gradient-to-t from-[#fff1a3] to-[#faeda3] text-center 
                odd:-rotate-1  even:rotate-1
                transition-all duration-700 shadow-[5px_10px_5px_0_rgba(0,0,0,0.3)] antialiased
                hover:shadow-[-1px_20px_10px_0_rgba(0,0,0,0.5)] hover:translate-y-[-20px] hover:cursor-pointer
                `}
    >
      <span className='absolute left-2 top-2 underline decoration-wavy decoration-[#fb6e6e]'>{item.id}</span>
      <blockquote className='mt-[1em]'>
        <p className=' p-[1em]'>{item?.wise_sayings}</p>
        <footer className="font-bold mt-[1em]">{item?.author}</footer>
      </blockquote>
      <div className="w-[20px] h-[45px] bg-[rgba(255,181,181,0.7)] absolute top-[-1em] right-1 rotate-45"></div>

      {pathName.includes('/user-quotes')
        ? <UserQuotesCardButton index={index} item={item} items={items} />
        : <QuotesCardButton index={index} itemId={item.id} items={items} category={category} />}
    </li>
  )
}

