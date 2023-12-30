
import { openDb } from '@/connect'
import { NextResponse } from 'next/server'

export async function GET() {
  const db = await openDb()
  const query = `
        SELECT id, author, wise_sayings FROM weathers
        ORDER BY id DESC
    `
  const items = await db.all(query)
  return NextResponse.json(items)
}
