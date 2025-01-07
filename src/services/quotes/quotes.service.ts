import { Method, getDefaultConfig } from "@/configs/config.api"
import { config } from "@/configs/config.url"
import { defaultFetch, getFetcher } from "@/utils/fetcher"
import { toast } from "react-toastify"

/** GET | 랜덤으로 명언 정보 불러오기 */
export const getTodayQuotesFromDb = async (url: string = `${config.apiPrefix}${config.apiHost}/api/quotes/today`) => {
    const configs = getDefaultConfig(Method.GET, false)
    const { success, items, meg } = await defaultFetch(url, configs)
    if (success) return items
    else {
      toast.error(meg)
      return meg
    }
  }
  
  
// GET | 인기 명언 조회
export async function getPopularityQuote(url:string) {
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
  
  
  