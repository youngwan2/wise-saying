import { logoutUser } from '@/utils/commonFunctions'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface UserPostType {
  category: FormDataEntryValue
  content: FormDataEntryValue
  author: FormDataEntryValue
}

/**
 * 유저가 작성한 포스트 수정 요청
 * @param postId
 * @param hasToken
 * @param router
 * @param userPost
 * @returns
 */
export const updateUserPost = async (
  postId: number,
  hasToken: boolean,
  router: AppRouterInstance,
  userPost: UserPostType,
) => {
  if (!hasToken) {
    alert('로그인 해주세요')
    router.push('/login')
  }
  const { category, content, author } = userPost
  if (category.toString().length < 1)
    return alert(`주제를 최소 2자 이상 적어 주세요.`)
  if (content.toString().length < 3)
    return alert(`내용을 최소 3자 이상 적어 주세요.`)
  if (author.toString().length <= 2)
    return alert('작성자를 최소 2자 이상 적어주세요.')

  const accessToken = sessionStorage.getItem('token')
  const headers = {
    authorization: `Bearer ${accessToken}`,
  }

  const body = { category, content, author }
  const response = await fetch(`/api/quotes/users/post/${postId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  })

  const { status, meg } = await response.json()
  if (status === 201) {
    alert(meg)
    router.push('/user-quotes')
    setTimeout(() => {
      location.reload()
    }, 1000)

    if (status !== 201) {
      const isSave = confirm('현재 작성한 내용을 임시 저장 하시겠습니까?')
      if (isSave) {
        localStorage.setItem('savaPost', JSON.stringify(body))
      }
    }
  }
}

/**
 * PATCH | 유저 비밀번호 수정 요청
 * @param password
 * @param userId
 * @returns
 */
export async function updateUserInfoFetcher(
  password: string,
  router: AppRouterInstance,
  userId: number,
) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(password),
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    const { meg, status } = await response.json()
    if (status === 201) {
      alert(meg + '보안을 위해 다시 로그인 해주세요.')
      return logoutUser()
    }

    return alert(meg)
  } catch (error) {
    alert(
      '서버 측 문제로 회원정보 업데이트 요청이 실패하였습니다. 나중에 다시시도 해주세요.',
    )
  }
}
