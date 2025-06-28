import { Method, fetchConfigNoBody } from '@/configs/config.api'
import apiRoute from '@/configs/config.api-route'


/**
 * POST | 특정 명언의 좋아요 증가/취소
 * @param id 명언 ID
 * @returns
 */
export const updateLikeCount = async (id: string) => {
  const url = apiRoute.QUOTES.QUOTES_LIKE_COUNT(id)
  const config = fetchConfigNoBody(Method.PATCH)
  try {
    const response = await fetch(url, config)
    const { success, likeCount } = await response.json();
    return { success, likeCount: likeCount || 0 }
  } catch {
    return { success: false, likeCount: null }
  }
}

/** GET | 현 명언의 좋아요 조회 요청 */
export const getLikeCountFromDB = async (id: string): Promise<{ success: boolean, likeCount: number | null, quoteId: number | null }> => {
  const url = apiRoute.QUOTES.QUOTES_LIKE_COUNT(id)
  const config = fetchConfigNoBody(Method.GET)
  try {
    const response = await fetch(url, config)
    const { success, likeCount, quoteId } = await response.json();
    return { success, likeCount, quoteId }
  } catch {
    return { success: false, likeCount: null, quoteId: null }
  }
}