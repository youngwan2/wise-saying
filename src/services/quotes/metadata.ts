import { openDB } from '@/utils/connect'
import { QUOTE_CATEGORY_TOTAL_LIMIT } from '@/constants'
import { QuoteMetaDataType, Target } from '@/types/metadata.types';
import { config } from '@/configs/config.url';



export async function getQuoteMetadata({ type, category, totalLimit }: QuoteMetaDataType) {

    let query = ''

    // 쿼리 분기처리
    switch (type) {
        case Target.USER_QUOTE_CATEGORY_ALL:
            query = `
            SELECT COUNT(DISTINCT category) AS count
            FROM user_quotes
            `
            break;
        case Target.USER_QUOTE:
            query = `
            SELECT COUNT(*) AS count
            FROM user_quotes
            WHERE category = $1
            `
            break;
        case Target.QUOTE_AUTHOR:
            query = `
            SELECT COUNT(*) AS count 
            FROM quotes A
            INNER JOIN authors B ON A.author_id = B.author_id
            WHERE B.author = $1
            `
            break;

        case Target.QUOTE_AUTHOR_CATEGORY_ALL:
            query = `
            SELECT COUNT(DISTINCT B.author) AS count 
            FROM quotes A
            INNER JOIN authors B ON A.author_id = B.author_id
            WHERE job != '사용자' ;
         `
            break;
        case Target.QUOTE_TOPIC:
            query = `
                SELECT COUNT(*) AS count FROM quotes
                WHERE category = $1
                    `
            break;
        case Target.QUOTE_TOPIC_CATEGORY_ALL:
            query = ` SELECT COUNT(DISTINCT category) AS count FROM quotes `
            break;
        default:
            throw new Error('요청 타입이 맞지 않습니다.')
    }

    // 조회
    const db = await openDB()
    try {
        const result = category
            ? await db.query(query, [decodeURIComponent(category)])
            : await db.query(query)

        const TOTAL_COUNT = Number(result.rows[0].count) || 0
        const LIMIT = totalLimit ? totalLimit : QUOTE_CATEGORY_TOTAL_LIMIT
        const MAX_PAGE = (Math.ceil(TOTAL_COUNT / LIMIT))

        return { maxPage: MAX_PAGE, totalCount: TOTAL_COUNT }
    } catch (error) {
        console.error('메타데이터 생성 실패:', error)
        return false
    } finally {
        db.end()
    }
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
    if (!url) return alert('형식과 맞지 않습니다. 확인 후 다시 요청 해주세요.')
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
  
  