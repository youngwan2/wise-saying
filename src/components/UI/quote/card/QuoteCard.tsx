import styles from '../Quotes.module.css'

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useCardTheme, useCardZoomInOutStore } from '@/store/store'
import useIntersectionObserver from '@/custom/useIntersectionObserver'

import ReplaceMessageCard from '../../common/card/ReplaceMessageCard'
import TtsButton from '../../common/button/TtsButton'
import QuoteViewIcon from '../icon/QuoteViewIcon'
import QuoteProgress from '../progress/QuoteProgress'
import QuoteDetailMoveButton from '../button/QuoteDetailMoveButton'
import QuoteContent from '../content/QuoteContent'

import { hoverAnimation, hoverAnimationMobile } from '@/utils/common-func'

import { getQuoteViewsFromDB } from '@/services/data/get'

import gsap from 'gsap/all'
import { HiSpeakerphone } from 'react-icons/hi'

import type { QuoteType } from '@/types/items.types'
import { Handlers, TtsType } from '../container/QuoteContainer'




interface PropsType {
  item: QuoteType
  items: QuoteType[]
  index: number
  ttsInfos: TtsType
  eventHandlerGroup: Handlers
  children: ReactNode
}

export default function QuoteCard({ item, index, ttsInfos, eventHandlerGroup, children }: PropsType) {

  const liRefs = useRef<HTMLLIElement[]>([])

  const [viewCount, setViewCount] = useState(0)

  const { isZoomIn, cardIndex } = useCardZoomInOutStore()
  const isCardTheme = useCardTheme((state) => state.isCardTheme)

  const { isPlaying, progress, readText } = ttsInfos
  const { quote_id: quoteId, author, quote } = item || { quote_id: 0, author: '', quote: '' }


  const setLiRefs = (index: number, element: HTMLLIElement | null) => {
    element instanceof HTMLLIElement && (liRefs.current[index] = element)
  }

  const setViews = useCallback(async () => {
    const views = await getQuoteViewsFromDB(quoteId, "views")
    setViewCount(views)
  }, [quoteId])


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
    setViews()

  }, [setViews])


  if (!item) return <ReplaceMessageCard childern="게시글이 존재하지 않습니다." />
  return (
    <li
      key={quoteId}
      onTouchMove={hoverAnimationMobile}
      onMouseMove={hoverAnimation}
      onMouseEnter={eventHandlerGroup.onPrefetch}
      ref={(element) => {
        if (typeof index === 'number' && element instanceof HTMLLIElement) {
          setLiRefs(index, element)
        }
      }}

      className={`
      ${styles.card}
       ${isCardTheme
          ? styles.card_theme_on
          : 'rounded-[5px] '} 
        border border-[rgba(255,255,255,0.1)] px-[15px] py-[35px] w-[95%] my-[1em] max-w-[500px] mx-auto invisible relative`}
    >

      <QuoteProgress progress={progress} />
      <TtsButton onClickSetText={eventHandlerGroup.onClickSetText} className='absolute right-[3.3em] top-[0.429em]  decoration-wavy decoration-[tomato] underline text-[1.1em] hover:shadow-[inset_0_0_0_1px_tomato]  p-[4px] py-[5px] text-[white]' quote={null} />
      <QuoteDetailMoveButton onClickDetailMove={eventHandlerGroup.onClickPageChange} />
      {children}

      {/* 명언 정보 */}
      <QuoteContent readText={readText} author={author} quote={quote} />

      {/* 프로그래스 숫자형 ex 1/100 */}
      <p>{isPlaying
        ? <span className='text-[1.05em] animate-pulse absolute bottom-2 left-2 text-white rounded-[10px] p-[2px] px-[7px] flex items-center'><HiSpeakerphone color='gold' className='mr-[5px]' /> {progress + '/100' || '현재 환경에서는 지원하지 않습니다.'}</span>
        : <span className='text-[1.05em] animate-none absolute bottom-2 left-2 text-white rounded-[10px] p-[2px] px-[7px]'></span>}
      </p>

      <QuoteViewIcon viewCount={viewCount} />
    </li>
  )
}

