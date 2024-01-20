import { config } from "@/lib/config";

export async function getItemFromDB(path: string = '') {
  try {
    const url =  config.apiPrefix + config.apiHost + `/api/items/${path}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

/**
 * * GET | 서버로부터 특정 경로에 대한 명언 리스트 불러오기
 * @param url
 * @returns {Promise} 아이템 목록 반환
 */
export async function getQuotesBy(url: string): Promise<any> {
  try {
    const response = await fetch(url)
    const items = await response.json()
    return items
  } catch (error) {
    console.error(error)
  }
}

/**
 * * GET | 명언  카테고리 불러오기
 * @param url 경로
 * @returns
 */
export async function getCategoriesFromDb(url: string) {
  try {
    const transformURL = config.apiPrefix + config.apiHost + url
    const response = await fetch(transformURL)
    const weeks = await response.json()
    return weeks
  } catch (error) {
    console.error(error)
  }
}

/**
 * * GET | 북마크 리스트 불러오기
 * @param url
 * @param token accessToken
 * @returns {Promise}
 */
export const getBookmarkListFormDB = async (
  url: string,
  token: string,
): Promise<any> => {
  if (token === '') return
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const items = response.json()
    return items
  } catch (error) {
    console.error(error)
  }
}

/**
 * * GET | 각 페이지의 카테고리별 메타데이터 불러오기
 * @param path1 중분류(ex. authors, days, etc, users, weathers)
 * @param path2 소분류(ex. 소크라테스, 월, 사랑, 인생)
 * @returns
 * @example `http://localhost:3000/api/items/${path1}/${path2}}`
 * → ` http://localhost:3000/api/items/authors/소크라테스`
 */
export const getApiMetaDataFromServer = async (
  path1: string,
  path2: string,
) => {
  try {
    const url = path1  === 'weathers'
      ? `${config.apiPrefix}${config.apiHost}/api/items/${path1}?type=meta`
      : `${config.apiPrefix}${config.apiHost}/api/items/${path1}/${path2}?type=meta`
    console.log('GET 메타 데이터 분기 경로:',url)
    const response = await fetch(url)
    const result = await response.json()

    return result
  } catch (error) {
    console.error(error)
  }
}

/**
 * GET | 랜덤으로 명언 정보 불러오기
 */
export const todayQuoteFetch = async () => {
  try {
    const url = config.apiPrefix + config.apiHost+"/api/items/random";
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    })
    const items = await response.json()
    return items
  } catch (error) {
    console.error(error)
  }
}
