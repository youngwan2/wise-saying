import { config } from '@/configs/config.url'


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



