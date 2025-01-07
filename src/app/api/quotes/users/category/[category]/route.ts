import { openDB } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';



/** GET | 유저가 작성한 주제별 명언 목록 */
const LIMIT = 30
export async function GET(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {

    const { category } = await params
    const page = req.nextUrl.searchParams.get('page') || 0
    const pageNum = Number(page)
    
    const db = await openDB()

    try {
        const query = `
        SELECT A.user_quote_id AS quote_id, quote, category, author, email, nickname, views AS view
        FROM user_quotes A
        JOIN users B ON A.user_id = B.user_id
        LEFT JOIN user_card_views C ON A.user_quote_id = C.user_quote_id
        WHERE category LIKE $1
        ORDER BY quote_id DESC
        LIMIT $2 OFFSET $3
        `
        const results = await db.query(query, [`%${category}%`, LIMIT, pageNum * LIMIT])
        const items = results.rows

        return NextResponse.json(items)
    } catch (error) {
        console.error(
            `api/quotes/users/route.ts`,
            error,
        );
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}