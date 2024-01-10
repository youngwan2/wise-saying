import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'

export async function GET(req: NextRequest,  res: { params: { id: string } }) {
  const { id: groupId } = res.params

  const db = await openDb()
  const query = `
        SELECT id, author, wise_sayings, category_id
        FROM quotes_day
        WHERE category_id=?
        ORDER BY id DESC
    `
  const items = await db.all(query, [Number(groupId)])
  return NextResponse.json(items)
}
