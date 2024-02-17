import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { tokenVerify } from '@/utils/auth'

//  GET | 북마크 조회 처리
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || 0
  const limit = req.nextUrl.searchParams.get('limit') || 5
  const pageNum = Number(page)
  const limitNum = Number(limit)

  const { status, meg, success, user } = tokenVerify(req, true)

  if (status === 400) return NextResponse.json({ status, success, meg })
  if (status === 401) return NextResponse.json({ status, success, meg })
  const userId = user.sub
  const db = await openDB()

  const query = `
          SELECT quote_url AS url, quote, A.quote_id AS id, author
          FROM bookmarks A 
          JOIN quotes B ON A.quote_id = B.quote_id 
          WHERE A.user_id = $1
          LIMIT $2 OFFSET $3
        `
  const countSelectQuery = `
          SELECT COUNT(*) AS count
          FROM bookmarks
          WHERE user_id = $1
        `
  try {
    const itemResults = await db.query(query, [
      userId,
      limit,
      pageNum * limitNum,
    ])
    const countResults = await db.query(countSelectQuery, [userId])

    const bookmarks = itemResults.rows
    const totalCount = countResults.rows[0].count || 0

    // 존재하는 경우
    return NextResponse.json({
      meg: '성공적으로 북마크 목록을 가져왔습니다.',
      success: true,
      status: 200,
      bookmarks: {
        bookmarks,
        totalCount,
      }

    })
  } catch (error) {
    console.error('/api/bookmark/route.ts', error)
    return NextResponse.json({
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도해 주세요',
      success: false,
      status: 500,
    })
  }
}

// POST | 북마크 추가 처리
export async function POST(req: NextRequest) {
  const { '0': body } = await req.json()
  const { quoteId } = body

  // 토큰 유효성 검증
  const { status, meg, success, user } = tokenVerify(req, true)

  if (status === 400) return NextResponse.json({ status, success, meg })
  if (status === 401) return NextResponse.json({ status, success, meg })
  const url = headers().get('referer')

  try {
    const db = await openDB()
    const userId = user.sub

    // (북마크 목록에 이미 존재하는 경우) 북마크 목록에 추가하지 않기
    const selectQuery = `
        SELECT user_id, quote_id FROM bookmarks
        WHERE user_id = $1 AND quote_id = $2
        `

    const bookmarkResults = await db.query(selectQuery, [userId, quoteId])
    const isExistingItem = bookmarkResults.rows[0]

    if (isExistingItem) {
      return NextResponse.json({
        meg: '이미 북마크 목록에 추가된 카드입니다.',
        success: false,
        status: 304,
      })
    }

    // (북마크 목록에 없는 경우) 북마크 목록에 추가하기
    const insertQuery = `
        INSERT INTO bookmarks(user_id, quote_id , quote_url)
        VALUES ($1, $2, $3)
        `
    await db.query(insertQuery, [userId, quoteId, url])
    db.end()
    return NextResponse.json({
      meg: '북마크에 추가되었습니다.',
      success: true,
      status: 201,
    })
  } catch (error) {
    console.error('/api/bookmark/route.ts')
    return NextResponse.json({
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      success: false,
      status: 500,
    })
  }
}
