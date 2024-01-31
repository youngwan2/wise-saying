import { openDb } from "@/connect";
import { NextRequest, NextResponse } from "next/server";


//GET | 유저가 작성한 포스트를 카테고리별로 조회
const LIMIT = 15
export async function GET(req: NextRequest, res: { params: { category: string } }) {

    const type = req.nextUrl.searchParams.get('type') || ''
    const page = req.nextUrl.searchParams.get('page') || 0
    const { category } = res.params

    try {
        /**--------- 전체 카테고리 조회 관련 로직 처리--------- */
        if (category === 'category-all') {

            // 유저 전체 카테고리 메타데이터
            if (type === 'meta') {
                const db = await openDb()
                const query = `
                SELECT COUNT(DISTINCT sub_category) AS count
                FROM quotes_all A
                JOIN users_group B
                ON A.user_id = B.user_id
                `
                const result = await db.get(query)
                const TOTAL_COUNT = result.count
                const MAX_PAGE = Math.ceil(TOTAL_COUNT / LIMIT)

                return NextResponse.json({ TOTAL_COUNT, MAX_PAGE})

            }

            // 전체 카테고리 목록 조회
            const db = await openDb()
            const joinQuery = `
                SELECT DISTINCT sub_category AS category
                FROM quotes_all A
                JOIN users_group B
                ON A.user_id = B.user_id
                LIMIT 15 OFFSET 15*?
            `
            const results = await db.all(joinQuery, [page])
            const items = results.map((categories, i) => {
                return { category: categories.category, category_id: i }
            }) || [{ category: '', category_id: 0 }]

            db.close()
            return NextResponse.json(items)

        }

        /**--------- 각 카테고리별 명언 목록 조회--------- */
        if (category !== 'category-all') {
            // 유저가 작성한 각 명언 목록의 메타데이터
            if (type === 'meta') {
                const db = await openDb()
                const query = `
                    SELECT COUNT(*) AS count
                    FROM users_group A  JOIN quotes_all B
                    ON A.user_id = B.user_id
                    WHERE sub_category = ?
                    
                `

                const { count: TOTAL_COUNT } = await db.get(query, [category])
                db.close()
                const MAX_PAGE = Math.ceil(TOTAL_COUNT / 15)

                return NextResponse.json({ TOTAL_COUNT, MAX_PAGE })
            }


            // 유저가 작성한 명언 목록 조회
            const db = await openDb()
            const query = `
            SELECT quote_id AS id, quote, sub_category AS category, author, email, nickname
            FROM users_group A JOIN quotes_all B 
            ON A.user_id = B.user_id
            WHERE sub_category = ?
            ORDER BY quote_id DESC
            LIMIT 15 OFFSET 15 * ?
        `
            const items = await db.all(query, [category, page])
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
