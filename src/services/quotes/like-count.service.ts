import { Method, defaultConfig } from '@/configs/config.api'
import { defaultFetch } from '@/utils/fetcher'
import { toast } from 'react-toastify'


/**
 * POST | 특정 명언의 좋아요 증가/취소
 * @param id 명언 ID
 * @returns
 */
export const postLike = async (id: number) => {
  const url = '/api/quotes/' + id + '/like'
  const config = defaultConfig(Method.POST)
  const { success, ...results } = await defaultFetch(url, config)
  if (success) {
    toast.success('반영되었습니다. 평가해주셔서 감사합니다.')
    return { isSuccess: true, likeCount: results.likeCount || 0 }
  }
  if (!success) {
    return false
  }
}
