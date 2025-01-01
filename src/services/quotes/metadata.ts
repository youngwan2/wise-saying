import { openDB } from '@/utils/connect'
import { QUOTE_CATEGORY_TOTAL_LIMIT } from '@/constants'
import { QuoteMetaDataType, Target } from '@/types/metadata.types';



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