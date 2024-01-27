import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

/**
 * POST | 로그인 요청
 * @param email
 * @param password
 */
export const reqLogin = async (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
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
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', accessToken)
      alert(`${dbEmail}님 환영합니다!. 잠시 후 Home 화면으로 이동합니다.`)
      location.reload()
    }

    if (status !== 201) {
      alert(meg)
    }
  } catch (error) {
    alert('네트워크 통신에 문제가 발생하였습니다. 나중에 다시시도 해주세요.')
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
  },
) => {
  if (!hasToken) {
    alert('로그인 해주세요')
    return router.push('/login')
  }

  const { category, content, author } = userPost

  // 유효성 검증 
  if (!(category && content && author))
    return alert('모든 빈 칸을 채워주세요')
  if (category.toString().length < 1)
    return alert(`주제를 최소 2자 이상 적어 주세요.`)
  if (content.toString().length < 3)
    return alert(`내용을 최소 3자 이상 적어 주세요.`)
  if (author.toString().length < 2)
    return alert('작성자를 최소 2자 이상 적어주세요.')

  // 포스트 요청
  try {
    const accessToken = localStorage.getItem('token') || ''
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
      router.back()
      router.refresh()
    }
    if (success !== 201) {
      alert(meg)
    }
  } catch (error) {
    console.error(error)
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
  nickname: string,
  imageUrl: string,
) {
  if (!hasToken) return alert('접근 권한이 없습니다.')
  const token = localStorage.getItem('token')
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

export const postComment = async (comment: FormDataEntryValue, quoteId: string | string[]) => {

  const token = localStorage.getItem('token')
  if (!token) return alert('로그인 후 이용 부탁 드립니다.')

  const body = {
    comment
  }

  const url = `/api/quotes/${quoteId}/comments?tag=comment`
  try {
    const resposne = await fetch(url, {
      method:'POST',
      headers: {
        'authorization': `Bearer ${token}`
      },
      body:JSON.stringify(body),
      next: {
        tags:['comment']
      }
    })
    await resposne.json()
    return true
  } catch (error) {
    console.error("에러발생", error)
  }


}