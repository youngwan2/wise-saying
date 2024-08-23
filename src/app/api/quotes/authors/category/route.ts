import { HTTP_CODE } from '@/app/http-code';
import { openDB } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

const LIMIT = 30
export async function GET(req: NextRequest) {
    const page = req.nextUrl.searchParams.get('page') || 0
    const db = await openDB()
    try {
        const pageNum = Number(page)
        const query = `
        SELECT DISTINCT B.author AS category, job, intro, birth
        FROM quotes A
        INNER JOIN authors B ON A.author_id = B.author_id
        LIMIT $1 OFFSET $2
        `
        const results = await db.query(query, [LIMIT, pageNum * LIMIT])
        const items = results.rows

        return NextResponse.json(items)
    } catch (error) {
        console.error(
            `api/quotes/authors/category/route.ts`,
            error,
        );
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
    } finally {
        await db.end()
    }
}