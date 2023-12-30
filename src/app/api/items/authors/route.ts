import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'

interface ItemsType {
  items: {
    id: number
    author: string
  }[]
}

export async function GET(req: NextRequest) {
  const db = await openDb()
  const query = `
        SELECT author_id AS id, author_name AS author FROM authors_group 
    `
  const items: ItemsType = await db.all(query)
  return NextResponse.json(items)
}
