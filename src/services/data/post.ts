import { Method, defaultConfig } from '@/configs/config.api'
import { defaultFetch } from '@/utils/fetcher'
import {toast as hotToast} from 'react-hot-toast'
/**
 * POST | 북마크 아이템을 추가하는 함수
 * @param itemId 북마크에 추가할 아이템의 식별자(=>quote_id)
 * @param pathName '/quotes/authors/${path}
 */
export const addBookmarkItem = async (itemId: number, path: string) => {
  const quoteUrl = location.origin + `${path}`
  const postData = {
    quoteId: itemId,
    url: quoteUrl,
  }

  const url = '/api/bookmark'
  const config = defaultConfig(Method.POST, postData)
  const result = await defaultFetch(url, config)
  const { meg, success } = result
  console.log(result)
  if (success) {
    hotToast.success(meg)
    return true
  }
  if (!success) {
    hotToast.error(meg)
    return false
  }
}
