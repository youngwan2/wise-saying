import { openDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


//GET | 유저가 작성한 포스트를 카테고리별로 조회
const LIMIT = 15
export async function GET(req: NextRequest, res: { params: { category: string } }) {

    const type = req.nextUrl.searchParams.get('type') || ''
    const page = req.nextUrl.searchParams.get('page') || 0
    const pageNum = Number(page)
    const limit = 15
    const { category } = res.params

    try {
        /**--------- 전체 카테고리 조회 관련 로직 처리--------- */
        if (category === 'category-all') {

            // 유저 전체 카테고리 메타데이터
            if (type === 'meta') {
                const db = await openDB()
                const query = `
                SELECT COUNT(DISTINCT category) AS count
                FROM quotes A
                JOIN users B
                ON A.user_id = B.user_id
                `
                const result = await db.query(query)
                const TOTAL_COUNT = result.rowCount || 0
                const MAX_PAGE = Math.ceil(TOTAL_COUNT / LIMIT)

                return NextResponse.json({ TOTAL_COUNT, MAX_PAGE})

            }

            // 전체 카테고리 목록 조회
            const db = await openDB()
            const joinQuery = `
                SELECT DISTINCT category
                FROM quotes A
                JOIN users B
                ON A.user_id = B.user_id
                LIMIT $1 OFFSET $2
            `
            const results = await db.query(joinQuery, [limit, pageNum * limit])
            const items = results.rows.map((categories, i) => {
                return { category: categories.category, category_id: i }
            }) || [{ category: '', category_id: 0 }]

            db.end()
            return NextResponse.json(items)

        }

        /**--------- 각 카테고리 클릭시 명언 목록 조회--------- */
        if (category !== 'category-all') {
            // 유저가 작성한 각 명언 목록의 메타데이터
            if (type === 'meta') {
                const db = await openDB()
                const query = `
                    SELECT COUNT(*) AS count
                    FROM users A  JOIN quotes B
                    ON A.user_id = B.user_id
                    WHERE category = $1
                    
                `

                const result = await db.query(query, [category])
                const TOTAL_COUNT = result.rowCount || 0
                const MAX_PAGE = Math.ceil(TOTAL_COUNT / 15)

                db.end()
                return NextResponse.json({ TOTAL_COUNT, MAX_PAGE })
            }


            // 유저가 작성한 명언 목록 조회
            const db = await openDB()
            const query = `
            SELECT quote_id AS id, quote, category, author, email, nickname
            FROM users A JOIN quotes B 
            ON A.user_id = B.user_id
            WHERE category = $1
            ORDER BY quote_id DESC
            LIMIT $2 OFFSET $3
        `   
            const results = await db.query(query, [category,limit, pageNum * limit])
            const items = results.rows[0]
            return NextResponse.json(items)
        }

    } catch (error) {
        console.error('/api/quotes/users/post/categories/[category]/route.ts', error)
        return NextResponse.json({
            status: 500,
            success: false,
            meg: '서버 측 문제 입니다. 나중에 다시 시도 해주세요.',
        })
    }
}
