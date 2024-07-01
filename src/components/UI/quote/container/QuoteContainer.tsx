'use client'

import { useCardZoomInOutStore } from '@/store/store'
import { usePathname, useRouter } from 'next/navigation'
import useTTS from '@/custom/useTTS'

import ZommInQuoteCard from '../card/ZoomInQuoteCard'
import CardTheme from '../../theme/CardTheme'
import QuoteList from '../list/QuoteList'

import { viewCounter } from '@/services/data/patch'
import { toast } from 'react-toastify'
import { QuoteType } from '@/types/items.types'


export interface TtsType {
  setText: (text: string) => void
  readText: string
  progress: number
  isPlaying: boolean
}


export interface Handlers {
  onClickPageChange: () => void;
  onPrefetch: () => void;
  onClickSetText: () => void;
  onClickGetCommentationInfo: () => Promise<void>
}


interface PropsType {
  items: QuoteType[]
}


export default function QuoteContainer({ items }: PropsType) {
  const router = useRouter()

  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)
  const pathName = usePathname()
  const hasUserQuotePage = pathName.startsWith('/user-quotes')
  const { setText, readText, progress, isPlaying } = useTTS()

  const ttsInfos = { setText, readText, progress, isPlaying }

  /** 이벤트 핸들러 그룹 */
  const eventHandlerGroup = (author: string, quote: string, quoteId: number): Handlers => {
    const handlers = {
      onClickPageChange: () => onClickPageChange(quoteId, author),
      onPrefetch: () => onPrefetch(quoteId, author),
      onClickSetText: () => onClickSetText(quote),
      onClickGetCommentationInfo: () => onClickGetCommentationInfo(quoteId)
    }
    return { ...handlers }
  }


  /** 상세 페이지 이동 */
  const onClickPageChange = (quoteId: number, author: string) => {
    viewCounter(quoteId, "views")
    router.push(`/quotes/authors/${author}/${quoteId}?type=no-user`)
  }
  /** 페이지 사전 로드 */
  function onPrefetch(quoteId: number, author: string) {
    router.prefetch(`/quotes/authors/${author}/${quoteId}?type=no-user`)
  }

  /** TTS 텍스트 설정 */
  const onClickSetText = (quote: string) => { setText(quote) }

  /** AI 명언 해석 요청 */
  const onClickGetCommentationInfo = async (quoteId: number) => {
    const response = await toast.promise(fetchData(quoteId), {
      pending: '데이터를 요청 중입니다.',
      success: '성공적으로 불러왔습니다.',
      error: '데이터 요청에 실패하였습니다.'
    })
    const { success, commentationInfo, meg } = response

    if (success) {
      const { commentation } = commentationInfo
      toast.info(commentation, {
        autoClose: false,
        position: 'top-center'
      })
    } else {
      toast.error(meg)
    }
  }


  return (
    <>
      <CardTheme />
      <QuoteList hasUserQuotePage={hasUserQuotePage} items={items} eventHandlerGroup={eventHandlerGroup} ttsInfos={ttsInfos} />
      <ZommInQuoteCard item={items[cardIndex || 0]} />
    </>
  )
}


/** POST |  명언 해석 정보 생성 요청 */
async function fetchData(quoteId: number) {
  const url = `/api/quotes/ai/commentation`
  const configs = {
    method: 'POST',
    body: JSON.stringify(quoteId)
  }
  try {
    const response = await fetch(url, configs)
    if (!response.ok) return '명언 해석 정보를 가져오지 못했습니다.'

    return await response.json()

  } catch (error) {
    console.error(error)
    return '명언 해석 정보를 가져오지 못했습니다.'
  }
}
