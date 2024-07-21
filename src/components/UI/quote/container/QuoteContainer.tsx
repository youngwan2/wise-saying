'use client'

import { useCardZoomInOutStore } from '@/store/store'
import { usePathname, useRouter } from 'next/navigation'

import ZommInQuoteCard from '../card/ZoomInQuoteCard'
import CardTheme from '../../theme/CardTheme'
import QuoteList from '../list/QuoteList'

import { viewCounter } from '@/services/data/patch'
import { toast } from 'react-toastify'
import { QuoteType } from '@/types/items.types'


export interface Handlers {
  onClickPageChange: () => void;
  onPrefetch: () => void;
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


  /** 이벤트 핸들러 그룹 */
  const eventHandlerGroup = (author: string, quote: string, quoteId: number, isUser?: boolean): Handlers => {
    const handlers = {
      onClickPageChange: () => onClickPageChange(quoteId, author, isUser),
      onPrefetch: () => onPrefetch(quoteId, author),
      onClickGetCommentationInfo: () => onClickGetCommentationInfo(quoteId, isUser)
    }
    return { ...handlers }
  }


  /** 상세 페이지 이동 */
  const onClickPageChange = (quoteId: number, author: string, isUser?: boolean) => {
    viewCounter(quoteId, "views")
    const url = !isUser ? `/quotes/authors/${author}/${quoteId}?type=no-user` : `/quotes/authors/${author}/${quoteId}`
    router.push(url)
  }
  /** 페이지 사전 로드 */
  function onPrefetch(quoteId: number, author: string, isUser?: boolean) {
    const url = !isUser ? `/quotes/authors/${author}/${quoteId}?type=no-user` : `/quotes/authors/${author}/${quoteId}`
    router.prefetch(url)
  }

  /** AI 명언 해석 요청 */
  const onClickGetCommentationInfo = async (quoteId: number, isUser: boolean = false) => {
    const response = await toast.promise(fetchData(quoteId, isUser), {
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
      <QuoteList hasUserQuotePage={hasUserQuotePage} items={items} eventHandlerGroup={eventHandlerGroup}  />
      <ZommInQuoteCard item={items[cardIndex || 0]} />
    </>
  )
}


/** POST |  명언 해석 정보 생성 요청 */
async function fetchData(quoteId: number, isUser: boolean = false) {
  const url = `/api/quotes/ai/commentation`
  const configs = {
    method: 'POST',
    body: JSON.stringify({ quoteId, isUser })
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
