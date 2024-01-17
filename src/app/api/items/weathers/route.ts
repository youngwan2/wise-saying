
import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req:NextRequest) {
  const db = await openDb()
  const page = req.nextUrl.searchParams.get('page')
  const limit = req.nextUrl.searchParams.get('limit')
  const query = `
        SELECT id, author, wise_sayings FROM quotes_weather
        ORDER BY id DESC
        LIMIT ? OFFSET ?*15
    `
  const items = await db.all(query,[limit, page])
  return NextResponse.json(items)
}
