import { config } from '@/configs/config.url'
import { requestNewAccessToken } from '../user/post'
import { defaultFetch } from '@/utils/fetcher'
import { Method, getDefaultConfig } from '@/configs/config.api'
import { toast } from 'react-toastify'


/**
 * * GET | 명언 카드 세부 페이지 조회수 불러오기
 * @param quoteId 명언 아이디
 * @param path views: 관리자가 관리하는 명언 카드 조회, user-card-views: 사용자가 관리하는 명언카드 조회
 * @returns views
 */
export async function getQuoteViewsFromDB(quoteId: number, path: 'user-card-views' | 'views') {
  const url = '/api/quotes/' + quoteId + '/' + path
  try {
    const response = await fetch(url)
    const { views } = await response.json()
    return views
  } catch (error) {
    console.error('조회수 조회 실패:', error)
    return 0
  }
}



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

  const url =
    type === 'users'
      ? `${config.apiPrefix}${config.apiHost}/api/quotes/${mainCategory}/post/categories/${subCategory}?type=meta`
      : type === 'authors'
        ? `${config.apiPrefix}${config.apiHost}/api/quotes/${mainCategory}/${subCategory}?type=meta`
        : null
  if(!url) return alert('형식과 맞지 않습니다. 확인 후 다시 요청 해주세요.')
  return await fetchModule(url)
}

//  fetch module
async function fetchModule(url: string) {
  const response = await fetch(url)
  if (!response.ok)
    throw new Error('명언 카테고리 목록를 가져오지 못 했습니다.')

  const result = await response.json()
  return result
}


/** GET | 랜덤으로 명언 정보 불러오기 */
export const getTodayQuotesFromDb = async () => {
  const url = `${config.apiPrefix}${config.apiHost}/api/quotes/today`
  const configs = getDefaultConfig(Method.GET, false)
  const { success, items, meg } = await defaultFetch(url, configs)
  if (success) return items
  else { return toast.error(meg) }
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



/**
 * 사이트 맵 | 카테고리 목록
 * @param mainCategory 주요 분기 카테고리 (authors | topics)
 * @returns 카테고리 목록 반환
 */
export async function getQuoteCategoryFromDb(mainCategory: string) {
  const url = config.apiPrefix + config.apiHost + `/api/sitemap/${mainCategory}`

  try {
    const res = await fetch(url, {
      cache: 'no-store'
    })
    const categories = await res.json()
    return categories
  } catch (error) {
    console.error('사이트맵 전용 카테고리 목록 불러오기 실패:', error)

  }
}
