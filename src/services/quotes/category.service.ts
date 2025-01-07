import { config } from "@/configs/config.url"

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
  
  
