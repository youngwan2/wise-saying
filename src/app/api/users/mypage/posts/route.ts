import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

// GET | 특정 유저가 작성한 포스트(명언) 목록을 가져온다.
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')

  const page = req.nextUrl.searchParams.get('page')

  const limit = 5
  const pageNum = Number(page)

  try {
    if (!userId)
      return NextResponse.json({
        meg: '잘못된 요청입니다. 쿼리 변수를 다시 확인해주세요.',
        status: 400,
        success: false,
      })

    const db = await openDB()

    const query = `
     SELECT quote_id AS id, author, quote, category, created_at
     FROM quotes
     WHERE user_id = $1
     ORDER BY id DESC
     LIMIT $2 OFFSET $3 * 5
    `
    const countSelectQuery = `
    SELECT COUNT(*) AS count
    FROM quotes
    WHERE user_id = $1
    `

    const countResults = await db.query(countSelectQuery, [userId])
    const itemsResults = await db.query(query, [
      userId,
      limit,
      pageNum,
    ])

    const quotes = itemsResults.rows
    const count = countResults.rows[0].count
    db.end()

    return NextResponse.json({
      meg: '요청을 완료하였습니다.',
      status: 200,
      success: true,
      quotes,
      count,
    })
  } catch (error) {
    console.log('/api/user/mypage/posts/route.ts', error)
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  }
}
