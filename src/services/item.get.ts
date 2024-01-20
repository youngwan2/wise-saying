export async function getItemFromDB(path: string = '') {
  try {
    const response = await fetch(`http://localhost:3000/api/items/${path}`)
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
    const transformURL = 'http://localhost:3000' + url
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
 * @param path1 중분류(ex. authors, days, etc, users)
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
    const response = await fetch(
      `http://localhost:3000/api/items/${path1}/${path2}?type=meta`,
    )
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
    const response = await fetch('http://localhost:3000/api/items/random', {
      next: { revalidate: 3600 },
    })
    const items = await response.json()

    return items
  } catch (error) {
    console.error(error)
  }
}
