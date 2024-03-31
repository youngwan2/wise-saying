import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { oauth2UserInfoExtractor, tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'

const query = `
SELECT quote_url AS url, quote, A.quote_id AS id, author
FROM bookmarks A 
JOIN quotes B ON A.quote_id = B.quote_id 
JOIN users C ON A.user_id = C.user_id
WHERE C.email = $1
LIMIT $2 OFFSET $3
`
const countSelectQuery = `
SELECT COUNT(*) AS count
FROM bookmarks A JOIN users B
ON A.user_id = B.user_id
WHERE B.email = $1
`

/** memo : 조회 시 에는 유저 이메일 기준으로, 추가 시에는 유저id 기준으로
 * (why? 소셜로그인 이메일과 일반 유저 이메일이 동일한 경우 공유하기 위함 -> 물론 회원가입 시 중복가입 자체는 차단) */
//  GET | 북마크 조회 처리
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || 0
  const limit = req.nextUrl.searchParams.get('limit') || 5

  const pageNum = Number(page)
  const limitNum = Number(limit)

  try {
    const db = await openDB()
    const { userId: socialUserId, email: socialEmail } =
      (await oauth2UserInfoExtractor()) || { userId: '', email: '' }

    if (socialUserId) {
      const itemResults = await db.query(query, [
        socialEmail,
        limit,
        pageNum * limitNum,
      ])

      const countResults = await db.query(countSelectQuery, [socialEmail])
      const bookmarks = itemResults.rows
      const totalCount = countResults.rows[0].count || 0

      return NextResponse.json({
        ...HTTP_CODE.OK,
        meg: '성공적으로 북마크 목록을 가져왔습니다.',
        bookmarks: {
          bookmarks,
          totalCount,
        },
      })
    }

    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    const jwtEmail = user.email
    const itemResults = await db.query(query, [
      jwtEmail,
      limit,
      pageNum * limitNum,
    ])

    const countResults = await db.query(countSelectQuery, [jwtEmail])
    const bookmarks = itemResults.rows
    const totalCount = countResults.rows[0].count || 0
    // 존재하는 경우
    return NextResponse.json({
      ...HTTP_CODE.OK,
      bookmarks: {
        bookmarks,
        totalCount,
      },
    })
  } catch (error) {
    console.error('/api/bookmark/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}

const selectQuery = `
SELECT A.user_id AS user_id, A.quote_id AS quote_id, B.email AS email 
FROM bookmarks A JOIN users B
ON A.user_id = B.user_id
WHERE email = $1 AND quote_id = $2
`

const insertQuery = `
INSERT INTO bookmarks(user_id, quote_id , quote_url)
VALUES ($1, $2, $3)
`
// POST | 북마크 추가 처리
export async function POST(req: NextRequest) {
  const { '0': body } = await req.json()
  const { quoteId, url } = body

  try {
    const db = await openDB()
    const { userId: socialUserId, email: socialEmail } =
      (await oauth2UserInfoExtractor()) || { userId: '', email: '' }

    if (socialUserId) {
      // (북마크 목록에 이미 존재하는 경우) 북마크 목록에 추가하지 않기
      const bookmarkResults = await db.query(selectQuery, [
        socialEmail,
        quoteId,
      ])
      const isExistingItem = bookmarkResults.rows[0]

      if (isExistingItem) {
        return NextResponse.json({
          ...HTTP_CODE.BAD_REQUEST,
          meg: '이미 북마크 목록에 추가된 카드입니다.',
        })
      }

      // (북마크 목록에 없는 경우) 북마크 목록에 추가하기
      await db.query(insertQuery, [socialUserId, quoteId, url])
      db.end()
      return NextResponse.json({
        ...HTTP_CODE.CREATED,
        meg: '북마크에 추가되었습니다.',
      })
    }

    // 토큰 유효성 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json({HTTP})

    const jwtEmail = user.email
    const userId = user.sub

    // (북마크 목록에 이미 존재하는 경우) 북마크 목록에 추가하지 않기
    const bookmarkResults = await db.query(selectQuery, [jwtEmail, quoteId])
    const isExistingItem = bookmarkResults.rows[0]

    if (isExistingItem) {
      return NextResponse.json({
        ...HTTP_CODE.BAD_REQUEST,
        meg: '이미 북마크 목록에 추가된 카드입니다.',
      })
    }

    // (북마크 목록에 없는 경우) 북마크 목록에 추가하기
    await db.query(insertQuery, [userId, quoteId, url])
    db.end()
    return NextResponse.json({
      ...HTTP_CODE.CREATED,
      meg: '북마크에 추가되었습니다.',
    })
  } catch (error) {
    console.error('/api/bookmark/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
