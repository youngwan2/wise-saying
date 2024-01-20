import { openDb } from '@/connect'
import { NextResponse } from 'next/server'

// 유저가 작성한 명언 카드의 카테고리를 가져온다.
export async function GET() {
  try {
    const db = await openDb()
    const joinQuery = `
        SELECT DISTINCT A.category AS category
        FROM quotes_user A JOIN users_group B
        ON A.user_id = B.user_id
        ORDER BY A.id DESC
    `

    const results = await db.all(joinQuery)

    const items = results.map((categories, i) => {
      return { category: categories.category, category_id: i }
    })
    db.close()
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ items: [] })
  }
}
