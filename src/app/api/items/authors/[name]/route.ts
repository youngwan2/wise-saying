import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: { params: { name: string } }) {
  const { name } = res.params

  const db = await openDb()
  const query = `
        SELECT id, B.category AS author,B.category AS category, A.wise_sayings AS wise_sayings 
        FROM quotes_author A JOIN authors_group B
        ON A.category_id = B.category_id AND B.category=?
        ORDER BY id DESC
    `
  interface ItemsType {
    id: number
    author: string
    category: string
    wise_sayings: string
  }

  const items: ItemsType[] = await db.all(query, [name])
  return NextResponse.json(items)
}
