import { config } from "@/lib/config"

/**
 * GET | 데이터베이스에서 유저 정보 불어오기
 * @param url 경로
 * @param token accessToken
 * @returns 유저정보를 반환합니다. 이 반환 정보를 바탕으로 getUserQuotesFromDb 를 호출합니다.
 */
export const getUserInfoFromDb = async (url: string, token: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  const result = await response.json()
  const { items: userInfo } = result

  return userInfo
}

/**
 * GET | 로그인한 유저의 명언 목록 불어오기
 * @param url 경로
 * @returns 로그인한 유저의 정보와 목록 갯수를 반환합니다.
 */
export const getUserQuotesFromDb = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
  })
  const { items: userInfo, count } = await response.json()
  return { userInfo, count }
}


export const getCategoryUserFromDb = async (path: string) => {
  const transformUrl = config.apiPrefix + config.apiHost + path
  const response = await fetch(transformUrl)
  const { status, items: categories } = await response.json()
  if (status === 200) return categories
  return []
}