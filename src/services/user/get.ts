import { config } from '@/configs/config'
import { requestNewAccessToken } from './post'

/**
 * GET | 데이터베이스에서 유저 정보 불어오기
 * @param url 경로
 * @param token accessToken
 * @returns 유저정보를 반환. 이 반환 정보를 바탕으로 getUserQuotesFromDb 를 호출
 */
export const getUserInfoFromDb = async (url: string, token: string) => {
  try {
    const response = await fetch(url, {
      next: { tags: ['all', 'user'] },
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) throw new Error('데이터 조회에 실패하였습니다.')

    const result = await response.json()
    const { status } = result

    if (status === 401) {
      const newToken = await requestNewAccessToken()
      if (newToken) {
        localStorage.setItem('token', newToken)
        await getUserInfoFromDb(url, newToken)
      }
    }

    if (status === 200) {
      const { items: userInfo } = result
      return userInfo
    }
  } catch (error) {
    console.error('에러 발생:', error)
  }
}

/**
 * GET | 로그인한 유저의 명언 목록 불어오기
 * @param url 경로
 * @returns 로그인한 유저의 정보와 목록 갯수를 반환
 */
export const getUserQuotesFromDb = async (url: string) => {
  const response = await fetch(url, {
    next: { tags: ['all', 'user'] },
    method: 'GET',
  })
  const { items: userInfo, count } = await response.json()
  return { userInfo, count }
}

/**
 * GET | 유저가 작성한 게시글의 카테고리 목록을 반환
 * @param path 경로
 * @returns 카테고리 목록 반환
 */
export const getCategoryUserFromDb = async (path: string) => {
  const transformUrl = config.apiPrefix + config.apiHost + path
  const response = await fetch(transformUrl, {
    next: { tags: ['user'] },
  })
  const { status, items: categories } = await response.json()
  if (status === 200) return categories
  return []
}



