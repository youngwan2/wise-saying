import { getAccessToken, setAccessToken, setUserInfo } from '@/utils/sessionStorage'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import toaster, { toast } from 'react-hot-toast'
import { mutate } from 'swr'

/**
 * POST | 새로운 refreshToken 발급
 */
const requestNewRefreshToken = async () => {
  const token = sessionStorage.getItem('token')
  const config = {
    method: 'POST', header: {
      authorization: 'Bearer ' + token
    }
  }

  try {
    const response = await fetch('/api/auth/refresh', config)
    if (!response.ok) throw new Error('토큰 발급 요청이 실패하였습니다.')

    const { status } = await response.json()

    if (status === 201) return true
    if (status === 401) return false

  } catch (error) {
    console.error(error)
  }
}

/**
 * POST | 새로운 accessToken 발급
 * @returns
 */
export const requestNewAccessToken = async () => {
  const config = { method: 'POST' }

  try {
    const respone = await fetch('/api/auth/access', config)

    // if (!respone.ok) throw new Error('토큰 발급 요청이 실패하였습니다.')
    const { status, accessToken } = await respone.json()

    if (status === 201) return accessToken

  } catch (error) {
    console.error('에러 발생: ', error)
  }
}

/**
 * POST | 로그인 요청
 * @param email
 * @param password
 */
export const reqLogin = async (
  email: string,
  password: string,
) => {
  if (!(email && password)) return

  const user = {
    email,
    password,
  }

  const config = {
    method: 'POST',
    body: JSON.stringify(user),
  }
  try {
    const response = await fetch('/api/auth/login', config)
    const {
      accessToken,
      email: dbEmail,
      status,
      meg,
      profile,
    } = await response.json()

    if (status === 201) {
      const user = {
        dbEmail,
        profile,
      }

      setUserInfo(user)
      setAccessToken(accessToken)
      alert(`${dbEmail}님 환영합니다!. 잠시 후 Home 화면으로 이동합니다.`)
      location.reload()
    }

    if (status !== 201) {
      toaster.error(meg)
    }
  } catch (error) {
    toaster.error('네트워크 통신에 문제가 발생하였습니다. 나중에 다시시도 해주세요.')
  }
}

/**
 * POST | 유저가 작성한 포스트를 등록 요청하는 메소드
 * @param hasToken accessToken
 * @param userPost
 * @param router
 */
export const postUserPost = async (
  router: AppRouterInstance,
  hasToken: boolean,
  userPost: {
    category: FormDataEntryValue
    content: FormDataEntryValue
    author: FormDataEntryValue
    isUser: boolean
  },
) => {
  if (!hasToken) {
    toaster.error('로그인 후 이용해주세요.')
    return router.push('/login')
  }

  const { category, content, author } = userPost

  // 유효성 검증
  if (!(category && content && author)) return toaster.error('모든 빈칸을 채워주세요.')
  if (category.toString().length < 1 || category.toString().length > 3)
    return toaster.error('주제를 최소 2자 이상~ 3자 이하로 적어 주세요.')

  if (content.toString().length < 3)
    return toaster.error('내용을 최소 3자 이상 적어 주세요.')

  if (author.toString().length < 2)
    return toaster.error('작성자를 최소 2자 이상 적어주세요.')

  // 포스트 요청
  try {
    const accessToken = sessionStorage.getItem('token') || ''
    const headers = {
      authorization: `Bearer ${accessToken}`,
    }
    const response = await fetch('/api/quotes/users/post', {
      method: 'POST',
      headers,
      body: JSON.stringify(userPost),
    })
    const { status, success, meg } = await response.json()

    // 응답 처리
    if (status === 201) {
      router.push('/user-quotes')
      router.refresh()
    }
    if (success !== 201) {
      alert(meg)
    }
  } catch (error) {
    console.error(error)
    toaster.error('네트워크 에러가 발생하였습니다. 나중에 다시시도 해주세요.')
  }
}

/**
 * POST | 유저 닉네임과 프로필 이미지 URL 을 저장
 * @param hasToken 토큰 존재 유무 판단
 * @param nickname 유저 닉네임
 * @param imageUrl 유저 프로필 이미지 URL
 * @returns
 */
export async function updateUserInfo(
  hasToken: boolean,
  nickname: FormDataEntryValue,
  imageUrl: string,
) {
  if (!hasToken) return alert('접근 권한이 없습니다.')
  const token = sessionStorage.getItem('token')
  const userInfo = {
    nickname: nickname,
    profile_image: imageUrl,
  }

  try {
    const response = await fetch('/api/users/mypage/upload?tag=user', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    const { status, meg } = await response.json()
    if (status === 201) {
      alert(meg)
    }
    if (status !== 201) {
      alert(meg)
    }
  } catch (error) {
    console.error('전송 실패:', error)
    alert(
      '전송 중 예기치 못한 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    )
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
  const token = sessionStorage.getItem('token')
  if (!token) return alert('로그인 후 이용 부탁 드립니다.')

  const body = {
    comment,
  }

  const url = `/api/quotes/${quoteId}/comments?tag=comment`
  try {
    const resposne = await fetch(url, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      next: {
        tags: ['comment'],
      },
    })
    await resposne.json()
    return true
  } catch (error) {
    console.error('에러발생', error)
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
  const token = getAccessToken() || ''
  const config = {
    method: 'POST',
    headers: {
      authorization: `Bearer ` + token
    },
    body: JSON.stringify({ content })
  }

  try {
    const response = await fetch(url, config)
    const { meg, replies, totalCount, status } = await response.json()
    if (status === 201) {
      toast.success(meg)
      mutate(url) // swr 재유효화
      return { replies, totalCount }
    }
    if (status !== 201) {
      toast.error(meg)
      return null
    }
  } catch (error) {
    console.error("POST reply 에러:", error)
    alert('네트워크 문제가 발생하였습니다. 나중에 다시시도 해주세요.')
    return null
  }
}