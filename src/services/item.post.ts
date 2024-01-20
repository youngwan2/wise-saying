import { ItemsType } from '@/types/items.types'
import { logoutUser } from '@/utils/commonFunctions'

/**
 * * POST  | 북마크 아이템을 추가하는 함수
 * @param hasToken accessToken 존재 유무 판단
 * @param itemId 북마크에 추가할 아이템의 식별자
 * @param items 전체 아이템 목록
 * @param category 아이템 분류
 */
export const postBookmarkItem = (
  hasToken: boolean,
  itemId: number,
  items: ItemsType[],
  category: string,
) => {
  if (!hasToken) return alert('로그인 후 이용해주시길 바랍니다.')

  const token = localStorage.getItem('token')
  const selectedItem = items.find((item) => item.id === itemId)
  const postData = {
    author: selectedItem?.author,
    wise_sayings: selectedItem?.wise_sayings,
    category,
  }

  const url = '/api/bookmark'
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const result = await response.json()
      const { meg, status } = result

      if (status === 201) {
        alert(meg)
      }
      if (status === 422) {
        alert(meg)
      }
      if (status === 401) {
        alert(meg)
        logoutUser()
      }
    })
    .catch((error) => {
      console.error(error)
    })
}
