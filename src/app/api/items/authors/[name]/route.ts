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
  const limit = req.nextUrl.searchParams.get('limit') || 15
  const type = req.nextUrl.searchParams.get('type')
  const db = await openDb()

  if (type === 'meta') {
    const countSelectQuery = `
        SELECT COUNT(*) AS count
        FROM quotes_author A JOIN authors_group B
        ON A.category_id = B.category_id AND B.category = ?
    `
    const result = await db.get(countSelectQuery, [name])
    const { count } = result
    const MAX_PAGE = Math.ceil(count / Number(limit))


    await db.close()
    return NextResponse.json({ TOTAL_COUNT: count, MAX_PAGE })

  } 
    const page = req.nextUrl.searchParams.get('page') || 0
    const query = `
        SELECT id, B.category AS author,B.category AS category, A.wise_sayings AS wise_sayings 
        FROM quotes_author A JOIN authors_group B
        ON A.category_id = B.category_id AND B.category = ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?*15
    `

    const items: ItemsType[] = await db.all(query, [name, limit, page])
    await db.close()
    return NextResponse.json(items)

}
