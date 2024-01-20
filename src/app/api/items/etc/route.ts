import { NextResponse } from 'next/server'
import { openDb } from '@/connect'

export async function GET() {
  const db = await openDb()
  const query = `
        SELECT category_id AS id, category FROM etc_group
    `
  const items = await db.all(query)
  return NextResponse.json(items)
}
