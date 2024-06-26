import { HTTP_CODE } from '@/app/http-code'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  res: { params: { category: string } },
) {
  try {
    const { category } = res.params || {category:''}
    const type = req.nextUrl.searchParams.get('type') || ''
    const limit = req.nextUrl.searchParams.get('limit') || 30
    const limitNum = Number(limit)

    const db = await openDB()

    /** 카테고리 목록 반환 */
    if (category === 'category-all') {
      const type = req.nextUrl.searchParams.get('type') || ''
      const limit = req.nextUrl.searchParams.get('limit') || 30
      const limitNum = Number(limit)

      // type === meta
      if (type === 'meta') {
        const query = `
                SELECT COUNT(DISTINCT category) AS count FROM quotes
                `
        const result = await db.query(query)
        const count = result.rows[0]
        return NextResponse.json(count)
      }

      // type !== mete
      const page = req.nextUrl.searchParams.get('page') || 0
      const pageNum = Number(page)
      const query = `
            SELECT DISTINCT category FROM quotes
            LIMIT $1 OFFSET $2
            `
      const results = await db.query(query, [limit, pageNum * limitNum])
      const items = results.rows
      await db.end()
      return NextResponse.json(items)
    }

    /**  각 주제별 명언 목록 반환 */
    if (category !== 'category-all') {
      // type === meta
      if (type === 'meta') {
        const countSelectQuery = `
                SELECT COUNT(*) AS count FROM quotes
                WHERE category = $1
                `
        const result = await db.query(countSelectQuery, [category])
        const { count } = result.rows[0]
        const MAX_PAGE = Math.ceil(count / limitNum)

        await db.end()
        return NextResponse.json({ TOTAL_COUNT: count, MAX_PAGE })
      }

      // type !== meta
      const page = req.nextUrl.searchParams.get('page') || 0
      const pageNum = Number(page)
      const query = `
            SELECT A.quote_id, author, quote, job, birth, intro
            FROM quotes A
            INNER JOIN authors B ON A.author_id = B.author_id
            WHERE A.category LIKE $1
            ORDER BY A.quote_id DESC
            LIMIT $2 OFFSET $3
            `
      const results = await db.query(query, [
        '%' + category + '%', limit, pageNum * limitNum,
      ])
      const items = results.rows
      await db.end()
      return NextResponse.json(items)
    }

    // 그 외 에러 처리
  } catch (error) {
    console.error('/api/quotes/topicks/[subCategory]/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
