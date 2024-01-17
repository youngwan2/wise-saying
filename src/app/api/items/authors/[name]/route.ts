import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'


interface ItemsType {
  id: number
  author: string
  category: string
  wise_sayings: string
}

export async function GET(req: NextRequest, res: { params: { name: string } }) {
  const { name } = res.params
  const page = req.nextUrl.searchParams.get('page')
  const limit = req.nextUrl.searchParams.get('limit')
  const db = await openDb()
  const query = `
        SELECT id, B.category AS author,B.category AS category, A.wise_sayings AS wise_sayings 
        FROM quotes_author A JOIN authors_group B
        ON A.category_id = B.category_id AND B.category = ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?*15
    `
  const countSelectQuery = `
        SELECT COUNT(*) AS count
        FROM quotes_author A JOIN authors_group B
        ON A.category_id = B.category_id AND B.category = ?
    ` 

  const result  =  await db.get(countSelectQuery,[name])
  const {count} = result
  const MAX_PAGE = Math.ceil(count / Number(limit))
  console.log(MAX_PAGE)
  const items: ItemsType[] = await db.all(query, [name, limit, page])
  return NextResponse.json(items)
}
