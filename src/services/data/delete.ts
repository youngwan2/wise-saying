import { Method, defaultConfig } from '@/configs/config.api'
import { defaultFetch } from '@/utils/fetcher'
import { mutate } from 'swr'

/**
 * DELETE | 유저가 선택한 명언 아이템 삭제
 * @param id 해당 카드의 식별자
 */
export const deleteUserQuote = async (id: number) => {
  const isDelete = confirm('정말로 삭제 하시겠습니까?')
  if (!isDelete) return alert('삭제 요청을 취소하였습니다.')

  const config = defaultConfig(Method.DELETE)
  const url = `/api/quotes/users/post/${id}`
  defaultFetch(url, config).then(() => {
    mutate(`/api/quotes/users/post/categories/0`)
  })
}
