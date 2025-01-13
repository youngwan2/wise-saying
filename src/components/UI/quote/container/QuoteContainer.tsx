'use client'

import { useCardZoomInOutStore } from '@/store/store'
import { usePathname, useRouter } from 'next/navigation'
import ZoomInQuoteCard from '../card/ZoomInQuoteCard'
import CardTheme from '../../theme/CardTheme'
import QuoteList from '../list/QuoteList'

import { toast } from 'react-toastify'
import { getAiQuoteComment } from '@/services/ai.service'
import { QuoteType } from '@/types/quote.types'
import { viewCounter } from '@/services/quotes/view-count.service'


export interface Handlers {
  onClickPageChange: () => void
  onPrefetch: () => void
  onClickAiComment: () => Promise<void>
}

interface PropsType {
  items: QuoteType[]
}

export default function QuoteContainer({ items }: PropsType) {
  const router = useRouter()
  const pathname = usePathname()

  const cardIndex = useCardZoomInOutStore((state) => state.cardIndex)
  const hasUserQuotePage = pathname.startsWith('/user-quotes')

  /** 이벤트 핸들러 그룹 */
  const eventHandlerGroup = (author: string, quoteId: number, isUser?: boolean): Handlers => ({
    onClickPageChange: () => handlePageChange(quoteId, author, isUser),
    onPrefetch: () => handlePrefetch(quoteId, author, isUser),
    onClickAiComment: () => requestAiComment(quoteId, isUser)
  })

  /** 상세 페이지 이동 */
  const handlePageChange = (quoteId: number, author: string, isUser?: boolean) => {
    const target = pathname.startsWith('/user-quotes') ? 'user-card-views' : 'views'
    viewCounter(quoteId, target)
    router.push(getQuoteUrl(quoteId, author, isUser))
  }

  /** 페이지 사전 로드 */
  const handlePrefetch = (quoteId: number, author: string, isUser?: boolean) => {
    router.prefetch(getQuoteUrl(quoteId, author, isUser))
  }

  /** AI 명언 해석 요청 */
  const requestAiComment = async (quoteId: number, isUser: boolean = false) => {
    const response = await toast.promise(getAiQuoteComment(quoteId, isUser), {
      pending: '데이터를 요청 중입니다.',
      success: '성공적으로 불러왔습니다.',
      error: '데이터 요청에 실패하였습니다.'
    })
    const { success, commentationInfo, meg } = response

    if (success) {
      const { commentation } = commentationInfo
      toast.info(commentation, { autoClose: false, position: 'top-center' })
    } else {
      toast.error(meg)
    }
  }

  /** 유저 명언 구분 */
  const getQuoteUrl = (quoteId: number, author: string, isUser?: boolean) => {
    return isUser
      ? `/quotes/authors/${author}/${quoteId}`
      : `/quotes/authors/${author}/${quoteId}?type=no-user`
  }

  return (
    <>
      <CardTheme />
      <QuoteList hasUserQuotePage={hasUserQuotePage} items={items} eventHandlerGroup={eventHandlerGroup} />
      <ZoomInQuoteCard item={items[cardIndex || 0]} />
    </>
  )
}
