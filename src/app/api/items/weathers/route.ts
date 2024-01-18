
import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const db = await openDb()

  const limit = req.nextUrl.searchParams.get('limit') || 15
  const type = req.nextUrl.searchParams.get('type') 

  if (type === 'meta') {
    const query = `
      SELECT COUNT(*) AS count
      FROM quotes_weather
   `
    const result = await db.get(query)
    const { count } = result
    const MAX_PAGE = Math.ceil(count / Number(limit))
    console.log(MAX_PAGE)

    db.close()
    return NextResponse.json({ MAX_PAGE, TOTAL_COUNT: count, })
  }

  const page = req.nextUrl.searchParams.get('page') || 0
  const query = `
      SELECT id, author, wise_sayings FROM quotes_weather
      ORDER BY id DESC
      LIMIT ? OFFSET ?*15
  `

  const items = await db.all(query, [limit, page])
  db.close()
  return NextResponse.json(items)

}
