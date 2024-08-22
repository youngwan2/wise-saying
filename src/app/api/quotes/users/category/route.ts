import { openDB } from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"


const LIMIT = 30
const joinQuery = ` SELECT DISTINCT category FROM user_quotes LIMIT $1 OFFSET $2 `
export async function GET(req: NextRequest) {
    const page = req.nextUrl.searchParams.get('page') || 0
    const pageNum = Number(page)
    const db = await openDB()
    
    try {
        const results = await db.query(joinQuery, [LIMIT, pageNum * LIMIT])
        const items = results.rows.map((categories, i) => {
            return { category: categories.category, category_id: i }
        }) || [{ category: '', category_id: 0 }]


        return NextResponse.json(items)
    } catch (error) {

    } finally {
        db.end()
    }
}