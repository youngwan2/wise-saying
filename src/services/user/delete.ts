import { logoutUser } from '@/utils/commonFunctions'
import { getAccessToken } from '@/utils/sessionStorage'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

/**
 * 회원탈퇴 요청
 * @param hasToken
 * @param userId
 * @param router
 * @returns
 */
export async function deleteUserInfo(
  userId: number,
  router: AppRouterInstance,
) {
  if (!userId) return alert('접근 권한이 없습니다.')
  const isDelete = prompt(
    '정말로 회원탈퇴를 시도하시려면, "회원탈퇴" 라고 입력해주세요. ',
  )

  if (isDelete === '회원탈퇴') {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      const { meg, status } = await response.json()

      if (status === 204) {
        logoutUser()
        return alert(meg)
      }
      return alert(meg)
    } catch (error) {
      alert(
        '서버 측 문제로 회원가입 탈퇴 요청이 실패 하였습니다. 나중에 다시시도 해주세요.',
      )
    }
  }
}


export async function deleteComment(hasToken:boolean, commentId:number) {
  if (!hasToken) {
    alert('로그인 해주세요.')
  }

  const isDelete = confirm('정말 삭제하시겠습니까?')
  if (!isDelete) return alert('삭제 요청을 취소하였습니다.')

  const token = getAccessToken() || '';
  const config = {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await fetch(`/api/quotes/${commentId}/comments`, config)
  const { status, meg } = await response.json()
  if (status == 200) return alert(meg)
  alert(meg)
}