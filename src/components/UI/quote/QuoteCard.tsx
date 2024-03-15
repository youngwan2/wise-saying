import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import UserQuotesCardControlButtons from './UserQuotesCardControlButtons'
import useIntersectionObserver from '@/custom/useIntersectionObserver'
import { useCardZoomInOutStore } from '@/store/store'
import { usePathname, useRouter } from 'next/navigation'
import { ItemsType } from '@/types/items.types'
import ReplaceMessageCard from '../common/ReplaceMessageCard'
import gsap from 'gsap/all'
import QuotesCardControlButtons from './QuotesCardControlButtons'
import useTTS from '@/custom/useTTS'
import { HiSpeakerphone } from 'react-icons/hi'
import {toast} from 'react-toastify'
import { viewCounter } from '@/services/data/patch'
import TtsButton from '../common/TtsButton'
import QuoteViews from './QuoteViews'
import QuoteProgress from './QuoteProgress'
import QuoteDetailMoveButton from './QuoteDetailMoveButton'
import QuoteContent from './QuoteContent'

interface PropsType {
  item: ItemsType
  items: ItemsType[]
  index: number
}

export default function QuoteCard({ item, items, index }: PropsType) {
  const router = useRouter()
  const pathName = usePathname()

  const [viewCount, setViewCount] = useState(0)

  const { setText, readText, progress, isPlaying } = useTTS()

  const isZoomIn = useCardZoomInOutStore((state) => state.isZoomIn)
  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)

  const liRefs = useRef<HTMLLIElement[]>([])
  const setLiRefs = (index: number, element: HTMLLIElement | null) => {
    element instanceof HTMLLIElement && (liRefs.current[index] = element)
  }


  async function getQuoteViewsFromDB(quoteId: number) {

    const url = '/api/quotes/' + quoteId + '/views'
    try {
      const response = await fetch(url)
      const { views } = await response.json()
      setViewCount(views)
    } catch (error) {
      console.error('조회수 조회 실패:', error)
    }
  }


  // 페이지 사전 로드
  function onPrefetch() {
    router.prefetch(`/quotes/authors/${item.author}/${item.id}`)
  }

  const cardZoomInoutSwitch = useCallback(
    (target: HTMLLIElement) => {
      // 줌 인(확대) 시 해당 li 는 사라진다.
      if (isZoomIn) {
        gsap.to(target, {
          visibility: 'hidden',
          opacity: 0,
          translateY: -50,
          translateZ: 15,
        })
      }

      // 줌 아웃(축소) 시 해당 li 가 다시 나타난다.
      if (!isZoomIn) {
        gsap.to(target, {
          visibility: 'visible',
          opacity: 1,
          translateY: 0,
          translateZ: 'none',
        })
      }
    },
    [isZoomIn],
  )

  // 상세 페이지 이동
  const onClickPushAnimation = (e: MouseEvent<HTMLButtonElement>) => {
    viewCounter(item.id)

    const tl = gsap.timeline()
    tl.to(e.currentTarget.parentElement, {
      scale: 0.8,
      duration: 1,
      onStart() {
        toast('✈ 잠시 후 페이지를 전환합니다.', {
          className: 'font-sans'
        })
      },
    })
    tl.to(e.currentTarget.parentElement, {
      scale: 0.5,
      rotateY: 10,
      filter: 'blur(1px)',
      borderTopLeftRadius: '5%',
      borderBottomLeftRadius: '5%',
      boxShadow: '-100px 0 100px 0 tomato'

    })
    tl.to(e.currentTarget.parentElement, {
      x: window.innerWidth,
      opacity: 0,
    })
    tl.to(e.currentTarget.parentElement, {
      onComplete() {
        router.push(`/quotes/authors/${item.author}/${item.id}`)
        tl.kill()
      },
    })
  }

  const onClickSetText = () => {
    setText(item.quote)
  }


  // 인터섹션 옵저버 적용하는 커스텀 훅
  useIntersectionObserver(liRefs)

  useEffect(() => {
    if (liRefs.current[cardIndex] === undefined) return
    if (liRefs.current.length > 0 && cardIndex >= 0) {
      const liEl = liRefs.current[cardIndex]

      cardZoomInoutSwitch(liEl)
    }
  }, [cardIndex, cardZoomInoutSwitch])

  useEffect(() => {
    getQuoteViewsFromDB(item.id)
  }, [item])

  if (!item)
    return <ReplaceMessageCard childern="게시글이 존재하지 않습니다." />
  return (
    <li
      onMouseEnter={onPrefetch}
      ref={(element) => {
        if (typeof index === 'number' && element instanceof HTMLLIElement) {
          setLiRefs(index, element)
        }
      }}
      key={item.id}
      className={`invisible shadow-[inset_0_0_0_3px_white] rounded-[10px] w-[95%] my-[1em] max-w-[500px] bg-transparent  px-[15px] py-[35px] mx-auto relative hover:bg-[#d5d5d533]`}
    >

      <QuoteProgress progress={progress} />
      <TtsButton onClickSetText={onClickSetText} className='absolute right-[3.3em] top-[0.429em]  decoration-wavy decoration-[tomato] underline text-[1.1em] hover:shadow-[inset_0_0_0_1px_tomato]  p-[4px] py-[5px] text-white' quote={null} />
      <QuoteDetailMoveButton onClickDetailMove={onClickPushAnimation} />

      {pathName.includes('/user-quotes') ? (
        <UserQuotesCardControlButtons index={index} item={item} items={items} />
      ) : (
        <QuotesCardControlButtons index={index} item={item} />
      )}

      {/* 명언 정보 */}
      <QuoteContent readText={readText} author={item.author} quote={item.quote} />

      {/* 프로그래스 숫자형 ex 1/100 */}
      <p>{isPlaying
        ? <span className='text-[1.05em] animate-pulse absolute bottom-2 left-2 text-white rounded-[10px] p-[2px] px-[7px] flex items-center'><HiSpeakerphone color='gold' className='mr-[5px]' /> {progress}/100</span>
        : <span className='text-[1.05em] animate-none absolute bottom-2 left-2 text-white rounded-[10px] p-[2px] px-[7px]'></span>}</p>

      <QuoteViews viewCount={viewCount} />
    </li>
  )
}

