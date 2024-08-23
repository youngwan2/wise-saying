import { HTTP_CODE } from '@/app/http-code';
import { openDB } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

const LIMIT = 30
export async function GET(req: NextRequest) {

    const page = req.nextUrl.searchParams.get('page') || 0
    const pageNum = Number(page)
    const db = await openDB()

    try {
        const query = `
          SELECT DISTINCT category FROM quotes
          LIMIT $1 OFFSET $2
          `
        const results = await db.query(query, [LIMIT, pageNum * LIMIT])
        const items = results.rows

        return NextResponse.json(items)

    } catch (error) {
        console.error(
            `api/quotes/topics/category/route.ts`,
            error,
        );
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
    } finally {
        db.end()
    }
}