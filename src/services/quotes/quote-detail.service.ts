import { openDB } from "@/utils/connect"
import { headers } from "next/headers"

const userCardSelectQuery = `
SELECT user_quote_id AS quote_id , quote, author, A.created_at AS created_at, category, email, nickname, profile_img_url
FROM user_quotes A
JOIN users B ON A.user_id = B.user_id
WHERE user_quote_id = $1 AND author = $2`

const adminCardSelectQuery = `
SELECT quote_id, quote, author, job, created_at, category
FROM quotes A
INNER JOIN authors B ON A.author_id = B.author_id
WHERE quote_id = $1 AND author = $2`

async function getQueryByType(type:string) {
    
    return type !== 'no-user' ? userCardSelectQuery : adminCardSelectQuery


}

/** GET | 디테일 명언 조회 */
export async function getQuoteDetail(id: string, name: string, type: string) {
    'use server'
    try {
        const db = await openDB()
        const result = await db.query(await getQueryByType(type), [id, decodeURIComponent(name)])
        const item = result.rows[0]

        return item
    } catch (error) {
        console.error(
            '명언 정보를 읽어오지 못함:',
            error,
        )
        return false
    }
}