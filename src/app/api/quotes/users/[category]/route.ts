import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'
import { accessTokenVerify } from '@/utils/validation'

// GET | 유저가 작성한 포스트 정보 조회
export async function GET(
  req: NextRequest,
  res: { params: { category: string } },
) {
  try {
    const db = await openDb()
    const { category } = res.params
    const limit = req.nextUrl.searchParams.get('limit') || 15
    const type = req.nextUrl.searchParams.get('type')

    if (type === 'meta') {
      const countSelectQuery = `
            SELECT COUNT(*) AS count
            FROM quotes_user A JOIN users_group B
            ON A.user_id = B.user_id AND category = ?
        `
      const result = await db.get(countSelectQuery, [category])
      const { count } = result
      const MAX_PAGE = Math.ceil(count / Number(limit)) || 1

      await db.close()
      return NextResponse.json({ TOTAL_COUNT: count, MAX_PAGE })
    }

    const page = req.nextUrl.searchParams.get('page') || 0
    const query = `
        SELECT user_quote_id AS id, quote, category, author, B.email AS email
        FROM quotes_user A JOIN users_group B
        ON A.user_id = B.user_id AND category = ?
        LIMIT ? OFFSET ?*15
    `
    const items = await db.all(query, [category, limit, page])
    await db.close()
    return NextResponse.json(items)
  } catch (error) {
    console.log('api/quotes/user/[category]/route.ts:', error)
    return NextResponse.json({ items: [] })
  }
}

