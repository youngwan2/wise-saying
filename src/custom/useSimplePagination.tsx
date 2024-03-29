import { QuoteType } from '@/types/items.types'
import { useEffect, useState } from 'react'

/**
 * 이전, 다음 버튼으로 페이지 이동이 가능한 커스텀 페이지네이션 훅
 * @param page 페이지 번호
 * @param quotes 명언 리스트
 * @returns  각 페이지 별로 분리된 명언 리스트 반환
 */
export default function useSimplePagination(page: number, quotes: QuoteType[]) {
  const [splitQuotes, setSplitQuotes] = useState<QuoteType[]>([])

  useEffect(() => {
    if (!Array.isArray(quotes)) return
    const copyQuotes = [...quotes?.slice(page * 5, page * 5 + 5)]
    if (copyQuotes[0] === undefined) return
    setSplitQuotes(copyQuotes)
  }, [page, quotes])

  return [splitQuotes]
}
