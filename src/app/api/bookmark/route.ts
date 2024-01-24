import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { accessTokenVerify } from '@/utils/validation'

//  GET | 북마크 조회 처리
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || 0
  const limit = req.nextUrl.searchParams.get('limit') || 5


  const { status, meg, success, user } = accessTokenVerify(req)

  if (status === 400) {
    return NextResponse.json({ status, success, meg })
  }

  if (status === 401) {
    return NextResponse.json({ status, success, meg })
  }
  const userId = user.userId

  const db = await openDb()

  const query = `
          SELECT url, quote, A.quote_id AS id, author
          FROM bookmarks A 
          JOIN quotes_all B ON A.quote_id = B.quote_id 
          WHERE A.user_id = ?
          LIMIT ? OFFSET ?*5
        `
  const countSelectQuery = `
          SELECT COUNT(*) AS count
          FROM bookmarks
          WHERE user_id = ?
        `
  try {
    const items = await db.all(query, [userId, limit, page])
    const countSelectResult = await db.get(countSelectQuery, [userId]) || { count: 0 }
    const totalCount = countSelectResult.count

    // 존재하는 경우
    return NextResponse.json({
      meg: '성공적으로 북마크 목록을 가져왔습니다.',
      success: true,
      status: 200,
      items,
      totalCount,
    })

  } catch (error) {
    console.error('/api/bookmark/route.ts')
    return NextResponse.json({
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도해 주세요',
      success: false,
      status: 500,
    })
  }
}

// POST | 북마크 추가 처리
export async function POST(req: NextRequest) {
  const { quoteId } = await req.json()

  // 토큰 유효성 검증
  const { status, meg, success, user } = accessTokenVerify(req)

  if (status === 400) {
    return NextResponse.json({ status, success, meg })
  }

  if (status === 401) {
    return NextResponse.json({ status, success, meg })
  }

  const url = headers().get('referer')
  try {
    const db = await openDb()

    const userId = user.userId

    // (북마크 목록에 이미 존재하는 경우) 북마크 목록에 추가하지 않기
    const selectQuery = `
        SELECT user_id, quote_id FROM bookmarks
        WHERE user_id = ? AND quote_id = ?   
        `

    const isExistingItem = !!(await db.get(selectQuery, [userId, quoteId]))

    if (isExistingItem) {
      return NextResponse.json({
        meg: '이미 북마크 목록에 추가된 카드입니다.',
        success: false,
        status: 304,
      })
    }

    // (북마크 목록에 없는 경우) 북마크 목록에 추가하기
    const insertQuery = `
        INSERT INTO bookmarks(user_id, quote_id , url, create_date)
        VALUES (?, ?, ?, ?)
        `
    const createDate = Date.now()

    db.get(insertQuery, [userId, quoteId, url, createDate])

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
