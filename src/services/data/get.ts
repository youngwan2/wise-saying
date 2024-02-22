import { config } from '@/configs/config.url'
import { requestNewAccessToken } from '../user/post'
import { getAccessToken } from '@/utils/sessionStorage'
import { defaultFetch } from '@/utils/fetcher'
import { Method, getDefaultConfig } from '@/configs/config.api'

/**
 * * GET | 명언  카테고리 목록 갯수 불러오기
 * @param url 경로
 * @returns
 */
export async function getCategoryCountFromDb(url: string) {
  try {
    const response = await fetch(url)
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
 */
export const getBookmarkListFetcher = async (url: string) => {
  const token = getAccessToken() || ''

  if (token.length < 2) return

  const config = getDefaultConfig(Method.GET, true)
  const response = await fetch(url, config)
  const results = await response.json()
  
  const { status, bookmarks } = results

  if (status === 200) return bookmarks
  if (status === 401) await requestNewAccessToken() // 토큰 재발급
}

/**
 * * GET | 각 페이지의 카테고리별 메타데이터 불러오기
 * @param mainCategory 중분류(ex. authors | topicks )
 * @param subCategory 소분류(ex. authors → 소크라테스, 공자 ,... | topicks → 사랑, 인생 , ...)
 * @returns
 * @example
 *    `http://localhost:3000/api/quotes/${mainCategory}/${subCategory}}`
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
export const getTodayQuotesFromDb = async () => {
  const url = config.apiPrefix + config.apiHost + '/api/quotes/random'
  const configs = getDefaultConfig(Method.GET, false)
  const { items } = await defaultFetch(url, configs)
  return items
}

/**
 * GET | 특정 포스트에 등록된 댓글 목록 불러오기
 * @param id
 * @returns
 */
export const getCommentsFormDb = async (url: string) => {
  const response = await fetch(url)
  const { comments, totalCount } = await response.json()
  return { comments, totalCount }
}

//  fetch module
async function fetchModule(url: string) {
  const response = await fetch(url)
  if (!response.ok)
    throw new Error('명언 카테고리 목록를 가져오지 못 했습니다.')

  const result = await response.json()
  return result
}
