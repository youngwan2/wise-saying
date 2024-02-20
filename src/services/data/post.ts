import { Method, defaultConfig } from '@/configs/config.api'
import { defaultFetch } from '@/utils/fetcher'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
/**
 * POST | 북마크 아이템을 추가하는 함수
 * @param itemId 북마크에 추가할 아이템의 식별자(=>quote_id)
 */
export const addBookmarkItem = async (itemId: number) => {
  const postData = {
    quoteId: itemId,
  }

  const url = '/api/bookmark'
  const config = defaultConfig(Method.POST, postData)
  const result = await defaultFetch(url, config)
  const { meg, success } = result
  if (success) {
    mutate(`/api/bookmark?page=0&limit=5`)
    return toast.success(meg)
  }
  if (!success) return toast.error(meg)
}
