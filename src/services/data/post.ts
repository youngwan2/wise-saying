import toaster from 'react-hot-toast'
/**
 * POST | 북마크 아이템을 추가하는 함수
 * @param hasToken accessToken 존재 유무 판단
 * @param itemId 북마크에 추가할 아이템의 식별자(=>quote_id)
 */
export const addBookmarkItem = (hasToken: boolean, itemId: number) => {
  if (!hasToken) return toaster.error('접근 권한이 없네요. 로그인 후 이용해 주세요')

  const token = sessionStorage.getItem('token')
  const postData = {
    quoteId: itemId,
  }

  const url = '/api/bookmark'
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const result = await response.json()
      const { meg, status } = result

      if (status === 201) {
        toaster.success(meg)
      }
      if (status !== 201) {
        toaster.error(meg)
      }
    })
    .catch((error) => {
      console.error(error)
    })
}
