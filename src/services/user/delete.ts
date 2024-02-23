import { Method, defaultConfig } from '@/configs/config.api'
import { logoutUser } from '@/utils/common-func'
import { defaultFetch } from '@/utils/fetcher'
import toast from 'react-hot-toast'
/**
 * DELETE | 회원탈퇴
 * @param userId
 * @returns
 */
export async function deleteUserInfo(userId: number) {
  if (!userId) return alert('접근 권한이 없습니다.')
  const isDelete = prompt(
    '정말로 회원탈퇴를 시도하시려면, "회원탈퇴" 라고 입력해주세요. ',
  )
  if (isDelete === null) return toast('👏 취소 되었습니다.')
  if (isDelete !== '회원탈퇴')
    return toast.error('틀렸습니다. 정확하게 입력해주세요.')

  const url = `/api/users/${userId}`
  const config = defaultConfig(Method.DELETE)
  const { success, meg } = await defaultFetch(url, config)
  if (success) return logoutUser()
  if (!success) return toast.error(meg)
}

/**
 * DELETE | 댓글 삭제
 * @param commentId 댓글 식별자
 * @returns
 */
export async function deleteComment(commentId: number) {
  const isDelete = confirm('정말 삭제하시겠습니까?')
  if (!isDelete) return alert('삭제 요청을 취소하였습니다.')

  const url = `/api/quotes/${commentId}/comments`
  const config = defaultConfig(Method.DELETE)
  const { success, meg } = await defaultFetch(url, config)
  if (success) return toast.success(meg)
  if (!success) return toast.error(meg)
}

/**
 * DELETE | 북마크 아이템 삭제
 * @param bookmarkId
 * @returns
 */
export async function deleteBookmark(bookmarkId: number) {
  const url = `/api/bookmark/${bookmarkId}`
  const config = defaultConfig(Method.DELETE)
  const { success, meg } = await defaultFetch(url, config)
  if (success) return toast.success(meg)
  if (!success) return toast.error(meg)
}
