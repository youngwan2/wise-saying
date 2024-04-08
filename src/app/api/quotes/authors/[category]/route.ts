import { HTTP_CODE } from '@/app/http-code'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  res: { params: { category: string } },
) {
  try {
    const { category } = res.params
    const limit = req.nextUrl.searchParams.get('limit') || 30
    const limitNum = Number(limit)
    const type = req.nextUrl.searchParams.get('type') || ''
    const db = await openDB()

    /**
     * * 저자별 명언 목록 정보를 반환
     */

    // 타입이 meta인 경우 조회된 목록의 총 갯수와 최대 페이지를 구하여 반환
    if (category !== 'category-all') {
      if (type === 'meta') {
        const countSelectQuery = `
        SELECT COUNT(*) AS count 
        FROM quotes A
        INNER JOIN authors B ON A.author_id = B.author_id
        WHERE B.author = $1
        `
        const result = await db.query(countSelectQuery, [category])
        const { count } = result.rows[0]
        const MAX_PAGE = Math.ceil(count / limitNum)

        await db.end()
        return NextResponse.json({ TOTAL_COUNT: count, MAX_PAGE })
      }

      // 타입이 meta 이 아닌 경우 조회된 목록를 페이지네이션으로 처리하여 반환
      const page = req.nextUrl.searchParams.get('page') || 0
      const pageNum = Number(page)
      const query = `
        SELECT A.quote_id, B.author AS author, quote, job, birth, intro 
        FROM quotes A
        INNER JOIN authors B ON A.author_id = B.author_id
        WHERE B.author = $1
        ORDER BY A.quote_id DESC
        LIMIT $2 OFFSET $3
        `

      const results = await db.query(query, [
        category,
        limit,
        pageNum * limitNum,
      ])
      const items = results.rows
      await db.end()
      return NextResponse.json(items)
    }

    /**
     * * * * * 저자 카테고리 목록 반환
     */
    if (category === 'category-all') {
      const type = req.nextUrl.searchParams.get('type') || ''

      const limit = req.nextUrl.searchParams.get('limit') || 30
      const limitNum = Number(limit)

      // 타입이 meta 인 경우 카테고리 갯수 반환
      if (type === 'meta') {
        const query = `
         SELECT COUNT(DISTINCT B.author) AS count 
         FROM quotes A
         INNER JOIN authors B ON A.author_id = B.author_id
         WHERE job != '사용자' ;
      `
        const result = await db.query(query)
        const count = result.rows[0]
        return NextResponse.json(count)
      }

      // 타입이 meta 가 아닌 경우 카테고리 목록 반환
      const page = req.nextUrl.searchParams.get('page') || 0
      const pageNum = Number(page)
      const query = `
      SELECT DISTINCT B.author AS category, job, intro, birth
      FROM quotes A
      INNER JOIN authors B ON A.author_id = B.author_id
      LIMIT $1 OFFSET $2
    `
      const results = await db.query(query, [limit, pageNum * limitNum])
      const items = results.rows
      await db.end()
      return NextResponse.json(items)
    }

    // 그 외 에러 처리
  } catch (error) {
    console.error('/api/quotes/authors/[category]/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
