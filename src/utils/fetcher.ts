import { Method, defaultConfig, getDefaultConfig } from '@/configs/config.api'

/**
 * * GET | 인피니티 스크롤 SWR
 * @param url
 * @returns 아이템 목록 반환
 */
export async function getInfiniteFetcher(url: string) {
  try {
    const response = await fetch(url)
    const items = await response.json()
    return items
  } catch (error) {
    console.error('GET 리스트 조회 실패:', error)
  }
}

/**
 * GET, POST, PATCH, DETETE | 일반 SWR
 * @param url
 * @returns
 */
export const getFetcher = async (
  url: string | null,
  isTokenVertify: boolean,
) => {
  if (!url) return
  const config = getDefaultConfig(Method.GET, isTokenVertify)
  const { success, meg, results } = await defaultFetch(url, config)
  if (!success) throw new Error(meg)
  return results
}

export const postFetcher = async (url: string, ...data: any) => {
  const config = defaultConfig(Method.POST, ...data)
  const isSuccess = await defaultFetch(url, config)
  return isSuccess
}

export const patchFetcher = async (url: string, ...data: any) => {
  const config = defaultConfig(Method.PATCH, ...data)
  const isSuccess: boolean = await defaultFetch(url, config)
  console.log(isSuccess)
  return isSuccess
}

export const deleteFetcher = async (url: string, ...data: any) => {
  const config = defaultConfig(Method.DELETE, data)
  const isSuccess: boolean = await defaultFetch(url, config)
  return isSuccess
}

/**
 * Fetch | 가본 api fetch 공통 양식
 * @param url 요청 경로
 * @param config 추가 설정
 * @returns
 */
export const defaultFetch = async (url: string, config: any) => {
  try {
    const response = await fetch(url, config)
    const { meg, success, status, ...results } = await response.json()
    if (success) return { success, meg, results, ...results }
    else return { success, meg }
  } catch (error) {
    console.error('데이터 처리 실패:', error)
  }
}
