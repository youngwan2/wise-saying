import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'

export async function GET(req: NextRequest, res: { params: { id: string } }) {
  const { id } = res.params
  const limit = req.nextUrl.searchParams.get('limit') || 15
  const type = req.nextUrl.searchParams.get('type')

  const db = await openDb()

  if (type === 'meta') {
    const countSelectQuery = `
    SELECT COUNT(*) AS count
    FROM quotes_day
    WHERE category_id = ?
    `
    const result = await db.get(countSelectQuery, [id])
    const { count } = result
    const MAX_PAGE = Math.ceil(count / Number(limit))
    await db.close()
    return NextResponse.json({ TOTAL_COUNT: count, MAX_PAGE })
  }

  const page = req.nextUrl.searchParams.get('page') || 0
  const query = `
        SELECT id, author, wise_sayings, category_id
        FROM quotes_day
        WHERE category_id = ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?*15
    `
  const items = await db.all(query, [id, limit, page])
  await db.close()
  return NextResponse.json(items)
}
