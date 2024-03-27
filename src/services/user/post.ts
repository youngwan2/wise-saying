import { Method, defaultConfig } from '@/configs/config.api'
import { ConsentsType } from '@/types/items.types'
import { defaultFetch } from '@/utils/fetcher'
import {
  setAccessToken,
  setLoginExp,
  setUserInfo,
} from '@/utils/session-storage'
import { toast } from 'react-toastify'

/**
 * POST | 새로운 refreshToken 발급
 */
export const requestNewRefreshToken = async () => {
  const token = sessionStorage.getItem('token')
  const config = {
    method: 'POST',
    header: {
      authorization: 'Bearer ' + token,
    },
  }

  try {
    const response = await fetch('/api/auth/general-auth/refresh', config)
    if (!response.ok) throw new Error('토큰 발급 요청이 실패하였습니다.')

    const { status } = await response.json()

    if (status === 201) return true
    if (status === 401) return false
  } catch (error) {
    console.error(error)
  }
}

/**
 * POST | 새로운 accessToken 발급 및 저장
 * @returns
 */
export const requestNewAccessToken = async () => {
  const config = { method: 'POST' }

  try {
    const respone = await fetch('/api/auth/general-auth/access', config)
    const { status, accessToken, exp, success } = await respone.json()

    if (status === 201) {
      setAccessToken(accessToken)
      setLoginExp(exp)
      return success
    }
  } catch (error) {
    console.error('accessToken 발급 실패: ', error)
    return false
  }
}

/**
 * POST | 로그인 요청
 * @param email
 * @param password
 */
interface UserType {
  email: string
  password: string
}
export const reqLogin = async ({ ...userInfo }: UserType) => {
  const { email: reqEmail, password: reqPassword } = userInfo
  if (!(reqEmail && reqPassword)) return

  const user = userInfo

  const url = '/api/auth/general-auth/login'
  const config = defaultConfig(Method.POST, user)
  const { meg, success, accessToken, exp, email, profile } = await defaultFetch(
    url,
    config,
  )

  if (success) {
    setUserInfo({ profile, dbEmail: email })
    setAccessToken(accessToken)
    setLoginExp(exp)

    toast.success(`${email}님 환영합니다!. 잠시 후 Home 화면으로 이동합니다.`)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  if (!success) toast.error(meg)
}

/**
 * POST | 회원가입 요청
 * @param email
 * @param password
 * @param reConfirmPw
 * @returns
 */

interface SignInUserType {
  email: string
  password: string
  reConfirmPw: string
}


export async function reqSingIn({ ...userInfo }: SignInUserType, consents:ConsentsType) {
  const body = {...userInfo, consents}
  const config = defaultConfig(Method.POST, body)
  const url = '/api/auth/general-auth/signin'
  const { success: isSuccess } = await defaultFetch(url, config)
  if (isSuccess) return isSuccess
  else return false
}

/**
 * POST | 유저가 작성한 포스트를 등록 요청하는 메소드
 * @param userPost
 */
export const postUserPost = async (userPost: {
  category: string
  content: string
  author: string
  isUser: boolean
}) => {
  const { category, content, author } = userPost

  // 유효성 검증
  if (!(category && content && author))
    return toast.error('모든 빈칸을 채워주세요.')
  if (category.toString().length < 1 || category.toString().length > 3)
    return toast.error('주제를 최소 2자 이상~ 3자 이하로 적어 주세요.')
  if (content.toString().length < 3)
    return toast.error('내용을 최소 3자 이상 적어 주세요.')
  if (author.toString().length < 2)
    return toast.error('작성자를 최소 2자 이상 적어주세요.')

  const url = '/api/quotes/users/post'
  const config = defaultConfig(Method.POST, userPost)
  const { success, meg } = await defaultFetch(url, config)
  if (success) {
    toast.success(meg)
    return true
  }
  if (!success) {
    toast.error(meg)
    return false
  }
}

/**
 * POST | 유저가 작성한 댓글을 등록
 * @param comment 코멘트
 * @param quoteId 명언 id
 */

export const postComment = async (
  comment: string,
  quoteId: string | string[],
) => {
  if (comment.length < 2) return toast.error('2자 이상 입력해주세요.')

  const url = `/api/quotes/${quoteId}/comments`
  const config = defaultConfig(Method.POST, comment)

  const { success } = await defaultFetch(url, config)

  if (success) {
    toast.success('댓글이 등록 되었습니다.')

    return true
  } else {
    return false
  }
}

/**
 * POST | 특정 댓글에 대한 대댓글 등록 요청
 * @param commentId
 * @param content 대댓글
 * @returns
 */
export const postReply = async (commentId: number, content: string) => {
  const url = `/api/quotes/0/comments/reply?comment-id=${commentId}`
  const config = defaultConfig(Method.POST, content)
  const { success } = await defaultFetch(url, config)
  if (success) {
    toast.success('댓글이 등록되었습니다.')
    return true
  }
  if (!success) return success
}

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
