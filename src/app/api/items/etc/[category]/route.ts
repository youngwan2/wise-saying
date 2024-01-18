import { openDb } from "@/connect"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: { params: { category: string } }) {
    const { category } = res.params
    const db = await openDb()

    const limit = req.nextUrl.searchParams.get('limit') || 15
    const type = req.nextUrl.searchParams.get('type')

    if (type === 'meta') {
        const query = `
        SELECT COUNT(*) AS count  
        FROM quotes_etc A JOIN etc_group B
        ON B.category_id = A.category_id AND B.category = ?
   `
        const result = await db.get(query, [category])
        const { count } = result
        const MAX_PAGE = Math.ceil(count / Number(limit))

        db.close()
        return NextResponse.json({ MAX_PAGE, TOTAL_COUNT: count })
    }
    const page = req.nextUrl.searchParams.get('page') || 0
    const query = `
        SELECT A.id AS id, A.author AS author, A.wise_sayings AS wise_sayings  
        FROM quotes_etc A JOIN etc_group B
        ON B.category_id = A.category_id AND B.category = ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?*15
    `
    const items = await db.all(query, [category, limit, page])

    db.close()
    return NextResponse.json(items)
}
