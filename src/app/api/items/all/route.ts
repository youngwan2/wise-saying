import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'

export async function GET(req: NextRequest) {
  const db = await openDb()

  const query = `
        SELECT id, author, wise_sayings, COUNT(*) AS count 
        FROM quotes_all
    `
  const items = await db.all(query)

  return NextResponse.json(items)
}
