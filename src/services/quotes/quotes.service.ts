import { Method, fetchConfigNoBody } from "@/configs/config.api"
import apiRoute from "@/configs/config.api-route"
import { getFetcher } from "@/utils/fetcher"

/**
 * GET | 랜덤으로 명언 정보 불러오기 
 * @param limit 요청할 랜덤 명언 수 
 */
export const getTodayQuotesFromDb = async (limit: number) => {
  const config = fetchConfigNoBody(Method.GET)
  const url = apiRoute.QUOTES.QUOTES_TODAY(limit)
  try {
    const response = await fetch(url, config)
    const { success, meg, items } = await response.json()
    return { success, meg, items }
  } catch (error) {
    return { success: false, meg: "오늘의 명언 조회 실패", items: null }
  }
}


// GET | 인기 명언 조회
export async function getPopularityQuote(url: string) {
  return getFetcher(url, false)
}


/**
 * * GET | 명언 카드 세부 페이지 조회수 불러오기
 * @param quoteId 명언 아이디
 * @param path views: 관리자가 관리하는 명언 카드 조회, user-card-views: 사용자가 관리하는 명언카드 조회
 * @returns views
 */
export async function getQuoteViewsFromDB(quoteId: number, path: 'user-card-views' | 'views') {
  const url = '/api/quotes/' + quoteId + '/' + path
  try {
    const response = await fetch(url)
    const { views } = await response.json()
    return views
  } catch (error) {
    console.error('조회수 조회 실패:', error)
    return 0
  }
}


