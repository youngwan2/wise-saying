/**
 * DELETE | 유저가 선택한 명언 아이템 삭제
 * @param hasToken accessToken 검증
 * @param id 해당 카드의 식별자
 */
export const deleteUserQuote = async (hasToken: boolean, id: number) => {

  const isDelete = confirm('정말로 삭제 하시겠습니까?')
  if (!isDelete) return alert('삭제 요청을 취소하였습니다.')
  if (hasToken) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    const url = `/api/quotes/users/post/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    })
    const { success } = await response.json()
    if (success === true) {
     
      alert('정상적으로 삭제처리 되었습니다. 이전 페이지로 이동합니다.')
      
      return true
    }
    if (success === false) {
      localStorage.clear()
      alert('로그인 가능 시간이 만료되었습니다. 다시 로그인 해주세요.')
      return false
    }
  }

  if (!hasToken) {
    alert('접근 권한이 없습니다.')
  }
}