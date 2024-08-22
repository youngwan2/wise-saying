
import { HTTP_CODE } from '@/app/http-code';
import { openDB } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';


const LIMIT = 30
export async function GET(req: NextRequest, res: { params: { category: string } }) {

    const db = await openDB()
    const category = res.params.category
    try {

        const page = req.nextUrl.searchParams.get('page') || 0
        const pageNum = Number(page)
        const query = `
        SELECT A.quote_id, B.author AS author, quote, job, birth, intro, C.views AS view
        FROM quotes A
        INNER JOIN authors B ON A.author_id = B.author_id
        INNER JOIN views C ON A.quote_id = C.quote_id
        WHERE B.author = $1
        ORDER BY A.quote_id DESC
        LIMIT $2 OFFSET $3
      `
      
        const results = await db.query(query, [
            category,
            LIMIT,
            pageNum * LIMIT,
        ])


        const items = results.rows
        console.log(items)
        await db.end()
        return NextResponse.json(items)

    } catch (error) {
        console.error(`api/quotes/authors/category/route.ts`, error);
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
    }
}