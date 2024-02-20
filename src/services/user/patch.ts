import { Method, defaultConfig } from '@/configs/config.api'
import { logoutUser } from '@/utils/commonFunctions'
import { defaultFetch } from '@/utils/fetcher'
import toast from 'react-hot-toast'

interface UserPostType {
  category: FormDataEntryValue
  content: FormDataEntryValue
  author: FormDataEntryValue
}

/**
 * PATCH | 유저가 작성한 포스트 수정 요청
 * @param postId
 * @param hasToken
 * @param router
 * @param userPost
 * @returns
 */
export const updateUserPost = async (
  postId: number,
  userPost: UserPostType,
) => {
  const { category, content, author } = userPost
  if (category.toString().length <= 1) return toast.error(`주제를 최소 2자 이상 적어 주세요.`);
  if (content.toString().length < 3) return toast.error(`내용을 최소 3자 이상 적어 주세요.`);
  if (author.toString().length <= 1) return toast.error('작성자를 최소 2자 이상 적어주세요.');

  const config = defaultConfig(Method.PATCH, userPost)
  const url = `/api/quotes/users/post/${postId}`
  const { success } = await defaultFetch(url, config)
  if (success) {
    toast.success('수정하였습니다.')
    return true
  }
  if (!success) {
    toast.error('수정 요청이 실패하였습니다.')
    return false

  }
}

/**
 * PATCH | 유저 댓글 수정
 * @param commentId 댓글 식별자
 * @param comment 댓글
 * @returns
 */
export async function updateComment(commentId: number, comment: string) {
  const config = defaultConfig(Method.PATCH, comment)
  const url = `/api/quotes/${commentId}/comments`
  const { success } = await defaultFetch(url, config)
  if (success) {
    return true
  } else false
}

/**
 * PATCH | 유저 비밀번호 수정 요청
 * @param password
 * @param userId
 * @returns
 */
export async function updateUserPassword(password: string, userId: number) {
  const url = `/api/users/${userId}`
  const config = defaultConfig(Method.PATCH, password)
  const { success, meg } = await defaultFetch(url, config)

  if (success) {
    toast.success('변경되었습니다. 보안을 위해 다시 로그인 해주세요')
    logoutUser()
  }
  if (!success) toast.error(meg)
}
