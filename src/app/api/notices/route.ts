import { HTTP_CODE } from "@/app/http-code";
import { openDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const page = req.nextUrl.searchParams.get('page')
    const categoryName = req.nextUrl.searchParams.get('category')
    const db = await openDB()

    try {
        const params = categoryName && !categoryName?.includes('전체') ?  [page, categoryName] : [page] 
        const query = categoryName && !categoryName?.includes('전체')
            ? `
            SELECT notice_id, content, created_at, name  FROM notices A INNER JOIN notice_categories B
            ON A.notice_category_id = B.notice_category_id
            WHERE B.name = $2 
            ORDER BY notice_id DESC LIMIT 10 OFFSET $1 * 10
            `
            : `
            SELECT notice_id, content, created_at, name FROM notices A INNER JOIN notice_categories B
            ON A.notice_category_id = B.notice_category_id
            ORDER BY notice_id DESC LIMIT 10 OFFSET $1 * 10
           `
        const notices = (await db.query(query, params)).rows

        return NextResponse.json({ ...HTTP_CODE.OK, notices: notices })
    } catch (error) {
        console.error('/api/notices/route.ts', error)
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)

    } finally {
        db.end()
    }



}