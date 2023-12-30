import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'

export async function GET(req: NextRequest,  res: { params: { id: string } }) {
  const { id: groupId } = res.params

  const db = await openDb()
  const query = `
        SELECT id, author, wise_sayings, day_group_id 
        FROM days 
        WHERE day_group_id=?
        ORDER BY id DESC
    `
  const items = await db.all(query, [Number(groupId)])
  return NextResponse.json(items)
}
