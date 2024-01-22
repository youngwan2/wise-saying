/**
 * DELETE | 유저가 선택한 명언 아이템 삭제
 * @param hasToken accessToken 검증
 * @param id 해당 카드의 식별자
 */
export const deleteUserQuote = (hasToken: boolean, id: number) => {
  if (hasToken) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    const url = `/api/posts/${id}`
    fetch(url, {
      method: 'DELETE',
      headers,
    })
      .then(async (response) => {
        const { success } = await response.json()
        if (success === true) location.reload()
        if (success === false) {
          localStorage.clear()
          alert('로그인 가능 시간이 만료되었습니다. 다시 로그인 해주세요.')
        }
      })
      .catch(console.error)
  }
  if (!hasToken) {
    alert('접근 권한이 없습니다.')
  }
}
