import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: { params: { name: string } }) {
  const { name } = res.params

  const db = await openDb()
  const query = `
        SELECT id, B.author_name AS author, A.wise_sayings AS wise_sayings 
        FROM quotes_authors A JOIN authors_group B
        ON A.author_id = B.author_id AND B.author_name=?
        ORDER BY id DESC
    `
  interface ItemsType {
    id: number
    author: string
    wise_sayings: string
  }

  const items: ItemsType[] = await db.all(query, [name])
  return NextResponse.json(items)
}
