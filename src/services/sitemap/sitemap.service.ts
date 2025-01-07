import { config } from "@/configs/config.url"

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
  
  
  