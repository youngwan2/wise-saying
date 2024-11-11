import { HTTP_CODE } from '@/app/http-code';
import { openDB } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

const LIMIT = 30
export async function GET(req: NextRequest, res: { params: { category: string } }) {

    const category = res.params.category
    const db = await openDB()
    const page = req.nextUrl.searchParams.get('page') || 0
    const pageNum = Number(page)
    try {


        const query = `
          SELECT A.quote_id, author, quote, job, birth, intro, C.views AS view
          FROM quotes A
          INNER JOIN authors B ON A.author_id = B.author_id
          LEFT JOIN views C ON A.quote_id = C.quote_id
          WHERE A.category LIKE $1
          ORDER BY A.quote_id DESC
          LIMIT $2 OFFSET $3
          `
        const results = await db.query(query, [
            '%' + category + '%', LIMIT, pageNum * LIMIT,
        ])
        const items = results.rows

        await db.end()
        return NextResponse.json(items)
    } catch (error) {
        console.error(
            `app/api/quotes/topics/category/[category]/route.ts`,
            error,
        );
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
    }
}