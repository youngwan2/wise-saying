import { HTTP_CODE } from '@/app/http-code'
import { tokenVerify } from '@/utils/auth'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

// GET | 특정 유저가 작성한 포스트(명언) 목록을 가져온다.
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page')
  const limit = 5
  const pageNum = Number(page)

  const db = await openDB()
  try {

    // 토큰 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400].includes(HTTP.status)) return NextResponse.json(HTTP, { status: 400, statusText: "Bad Request" })
    if ([401].includes(HTTP.status)) return NextResponse.json(HTTP, { status: 401, statusText: "Unauthenticated" })

    const { sub: userId } = user



    const query = `
     SELECT user_quote_id AS quote_id, author, quote, category, email, A.created_at AS created_at
     FROM user_quotes A
     JOIN users B ON A.user_id = B.user_id
     WHERE A.user_id = $1
     ORDER BY user_quote_id DESC
     LIMIT $2 OFFSET $3 * 5
    `
    const countSelectQuery = `
    SELECT COUNT(*)
    FROM user_quotes A
    JOIN users B ON A.user_id = B.user_id
    WHERE A.user_id = $1
    
   `

    const countResults = await db.query(countSelectQuery, [userId])
    const itemsResults = await db.query(query, [userId, limit, pageNum])
    const quotes = itemsResults.rows
    const count = countResults.rows[0].count


    return NextResponse.json({
      ...HTTP_CODE.OK,
      quotes,
      count,
    })
  } catch (error) {
    console.log('/api/user/mypage/posts/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  } finally {
    db.end()
  }
}
