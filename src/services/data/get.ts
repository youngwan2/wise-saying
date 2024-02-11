import { config } from '@/configs/config'
import { requestNewAccessToken } from '../user/post'

/**
 * * GET | 서버로부터 특정 경로에 대한 명언 리스트 불러오기
 * @param url
 * @returns 아이템 목록 반환
 */
export async function getQuotesBy(url: string) {
  try {
    const response = await fetch(url)
    const items = await response.json()
    return items
  } catch (error) {
    console.error('에러 발생:', error)
  }
}

/**
 * * GET | 명언  카테고리 목록 갯수 불러오기
 * @param url 경로
 * @returns
 */
export async function getCategoryCountFromDb(url: string) {
  try {
    const transformURL = config.apiPrefix + config.apiHost + url
    const response = await fetch(transformURL)
    if (!response.ok)
      throw new Error('명언 카테고리 목록를 가져오지 못 했습니다.')

    const { count } = await response.json()
    return count
  } catch (error) {
    console.error('에러 발생:', error)
  }
}

/**
 * * GET | 북마크 리스트 불러오기
 * @param url
 * @param token accessToken
 */
export const getBookmarkListFormDB = async (url: string, token: string) => {
  if (token.length < 2) return
  try {
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    const items = await response.json()
    const { status } = await items

    if (status === 200) return items
    if (status === 401) {
      const newToken = await requestNewAccessToken()
      if(newToken) {
        sessionStorage.setItem('token', newToken)
      }
    }
  } catch (error) {
    console.error(error)
  }
}


async function fetchModule(url: string) {
  const response = await fetch(url)
  if (!response.ok)
    throw new Error('명언 카테고리 목록를 가져오지 못 했습니다.')

  const result = await response.json()
  return result
}

/**
 * * GET | 각 페이지의 카테고리별 메타데이터 불러오기
 * @param mainCategory 중분류(ex. authors, days, etc, users, weathers)
 * @param subCategory 소분류(ex. 소크라테스, 랑, 인생)
 * @returns
 * @example `http://localhost:3000/api/quotes/${mainCategory}/${subCategory}}`
 * → ` http://localhost:3000/api/quotes/authors/소크라테스`
 */
export const getApiMetaDataFromServer = async (
  mainCategory: string,
  subCategory: string,
  type: string,
) => {
  switch (type) {
    case 'users': {
      const url = `${config.apiPrefix}${config.apiHost}/api/quotes/${mainCategory}/post/categories/${subCategory}?type=meta`
      return await fetchModule(url)
    }
    case 'authors': {
      const url = `${config.apiPrefix}${config.apiHost}/api/quotes/${mainCategory}/${subCategory}?type=meta`
      return await fetchModule(url)
    }
  }
}

/**
 * GET | 랜덤으로 명언 정보 불러오기
 */
export const todayQuoteFetch = async () => {
  try {
    const url = config.apiPrefix + config.apiHost + '/api/quotes/random'
    const response = await fetch(url)
    const items = await response.json()
    return items
  } catch (error) {
    console.error('에러 발생:', error)
  }
}

/**
 * GET | 특정 포스트에 등록된 댓글 목록 불러오기
 * @param id
 * @returns
 */
export const getCommentsFormDb = async (url: string) => {
  const response = await fetch(url, {
    next: {
      tags: ['comment'],
    },
  })
  const data = await response.json()
  return data
}
