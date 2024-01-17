import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'

export async function GET(req: NextRequest,  res: { params: { id: string } }) {
  const { id } = res.params
  const page = req.nextUrl.searchParams.get('page')
  const limit = req.nextUrl.searchParams.get('limit')

  console.log(id, page,limit)

  const db = await openDb()
  const query = `
        SELECT id, author, wise_sayings, category_id
        FROM quotes_day
        WHERE category_id = ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?*15
    `
  const items = await db.all(query, [id, limit,page ])
  console.log(items)
  return NextResponse.json(items)
}
