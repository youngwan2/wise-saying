import { MouseEvent, useCallback, useEffect, useRef } from 'react'
import UserQuotesCardControlButtons from './UserQuotesCardControlButtons'
import useIntersectionObserver from '@/custom/useIntersectionObserver'
import { useCardZoomInOutStore } from '@/store/store'
import { usePathname, useRouter } from 'next/navigation'
import { ItemsType } from '@/types/items.types'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import gsap from 'gsap/all'
import QuotesCardControlButtons from './QuotesCardControlButtons'
import { HiDocumentMagnifyingGlass } from 'react-icons/hi2'
import { SlEarphones } from 'react-icons/sl'
import useTTS from '@/custom/useTTS'

interface PropsType {
  item: ItemsType
  items: ItemsType[]
  index: number
}

export default function QuoteCard({ item, items, index }: PropsType) {
  const liRefs = useRef<HTMLLIElement[]>([])
  const pathName = usePathname()
  const { setText } = useTTS()

  const router = useRouter()
  const isZoomIn = useCardZoomInOutStore((state) => state.isZoomIn)
  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)

  const setLiRefs = (index: number, element: HTMLLIElement | null) => {
    element instanceof HTMLLIElement && (liRefs.current[index] = element)
  }

  // 인터섹션 옵저버 적용하는 커스텀 훅
  useIntersectionObserver(liRefs)

  const cardZoomInoutSwitch = useCallback(
    (target: HTMLLIElement) => {
      // 줌 인(확대) 시 해당 li 는 사라진다.
      if (isZoomIn) {
        gsap.set(target, {perspective:600})
        gsap.to(target, {
          visibility: 'hidden',
          opacity: 0,
          translateY: -50,
          translateZ: 15,
        })
      }

      // 줌 아웃(축소) 시 해당 li 가 다시 나타난다.
      if (!isZoomIn) {
        gsap.to(target, { visibility: 'visible', opacity: 1, translateY: 0 })
      }
    },
    [isZoomIn],
  )

  // 상세 페이지 이동
  const onClickPushAnimation = (e: MouseEvent<HTMLButtonElement>) => {
    router.prefetch(`/quotes/authors/${item.author}/${item.id}`)
    const tl = gsap.timeline()
    tl.to(e.currentTarget.parentElement, {
      rotateX: -20,
      translateY: -300,
      opacity: 0,
      scale: 0,
      translateZ: -1000,
      backfaceVisibility: 'hidden',
      perspective: 600
    })
    tl.to(e.currentTarget.parentElement, {
      onComplete() {
        router.push(`/quotes/authors/${item.author}/${item.id}`)
        tl.kill()
      }
    })
  }

  useEffect(() => {
    if (liRefs.current[cardIndex] === undefined) return
    if (liRefs.current.length > 0 && cardIndex >= 0) {
      const liEl = liRefs.current[cardIndex]

      cardZoomInoutSwitch(liEl)
    }
  }, [cardIndex, cardZoomInoutSwitch])

  if (!item)
    return <ReplaceMessageCard childern="게시글이 존재하지 않습니다." />

  return (
    <li
      ref={(element) => {
        if (typeof index === 'number' && element instanceof HTMLLIElement) {
          setLiRefs(index, element)
        }
      }}
      key={item.id}
      className='invisible shadow-[inset_0_0_0_3px_white] perspective-500 rounded-[10px] w-[95%] my-[1em] max-w-[500px] bg-transparent  px-[15px] py-[35px] mx-auto relative hover:bg-[#d5d5d533] '
    >

      <blockquote className="mt-[1em] text-white ">
        <p className=" p-[1em] text-[1.15em]">{item.quote}</p>
        <footer className="font-bold mt-[1em] text-right">- {item.author} -</footer>
      </blockquote>

      {pathName.includes('/user-quotes') ? (
        <UserQuotesCardControlButtons index={index} item={item} items={items} />
      ) : (
        <QuotesCardControlButtons index={index} item={item} />
      )}
      {/* 상세 페이지 이동 버튼 */}
      <button onClick={onClickPushAnimation} className='absolute right-[1.8em] top-[0.45em]  decoration-wavy decoration-[tomato] underline text-[1.1em] hover:shadow-[inset_0_0_0_1px_tomato]  p-[4px] py-[5px] text-white  '><HiDocumentMagnifyingGlass /></button>
      {/* 듣기 버튼 */}
      <button
        onClick={() => { setText(item.quote); }} aria-label="명언 듣기 버튼"
        className='absolute right-[3.3em] top-[0.429em]  decoration-wavy decoration-[tomato] underline text-[1.1em] hover:shadow-[inset_0_0_0_1px_tomato]  p-[4px] py-[5px] text-white '
      > <SlEarphones className='pr-[2px]' /> </button>
      
    </li>
  )
}
