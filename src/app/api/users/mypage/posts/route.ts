import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  const page = req.nextUrl.searchParams.get('page')

  try {
    if (!userId)
      return NextResponse.json({
        meg: '잘못된 요청입니다. 쿼리 변수를 다시 확인해주세요.',
        status: 400,
        success: false,
      })

    const db = await openDb()

    const joinQuery = `
        SELECT quote_id AS id,author, quote, sub_category AS category, create_date
        FROM quotes_all
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT 5 OFFSET ? * 5
    `

    const countQuery = `
        SELECT COUNT(*) AS count
        FROM quotes_all
        WHERE user_id = ?
    `

    const items = await db.all(joinQuery, [userId, page])
    const { count} = await db.get(countQuery, [userId])

    return NextResponse.json({
      meg: '요청을 완료하였습니다.',
      status: 200,
      success: true,
      items,
      count,
    })
  } catch (error) {
    console.log('/api/user/mypage/posts/route.ts',error)
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  }
}
