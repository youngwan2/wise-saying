import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  res: { params: { category: string } },
) {
  let db
  try {
    db = await openDb()
    const { category } = res.params

    const limit = req.nextUrl.searchParams.get('limit') || 15
    const type = req.nextUrl.searchParams.get('type')

    if (type === 'meta') {
      const query = `
        SELECT COUNT(*) AS count  
        FROM quotes_etc A JOIN etc_group B
        ON B.category_id = A.category_id AND B.category = ?
   `
      const result = await db.get(query, [category])
      const { count } = result
      const MAX_PAGE = Math.ceil(count / Number(limit))

      return NextResponse.json({ MAX_PAGE, TOTAL_COUNT: count })
    }
    const page = req.nextUrl.searchParams.get('page') || 0
    const query = `
        SELECT A.id AS id, A.author AS author, A.wise_sayings AS wise_sayings  
        FROM quotes_etc A JOIN etc_group B
        ON B.category_id = A.category_id AND B.category = ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?*15
    `
    const items = await db.all(query, [category, limit, page])

    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버 측에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  } finally {
    db?.close()
  }
}
