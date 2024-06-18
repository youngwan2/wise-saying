import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'
import { Pool } from 'pg'

const query = `
SELECT quote_url AS url, quote, A.quote_id AS id, author
FROM bookmarks A 
JOIN quotes B ON A.quote_id = B.quote_id 
JOIN users C ON A.user_id = C.user_id
JOIN authors D ON B.author_id = D.author_id
WHERE C.email = $1
LIMIT $2 OFFSET $3
`

const userBookmarkSelectQuery = `
SELECT A.quote_url AS url, B.quote AS quote, A.user_quote_id AS id
FROM user_bookmarks A
JOIN user_quotes B ON A.user_quote_id = B.user_quote_id
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

const userBookmarksCountSelectQuery = `
SELECT COUNT(*) AS count
FROM user_bookmarks A JOIN users B
ON A.user_id = B.user_id
WHERE B.email = $1
`

async function dbQueryModule(db: Pool, email: string = '', pageInfo: { limit: number | string, pageNum: number, limitNum: number }) {
  const { limit, limitNum, pageNum } = pageInfo
  const itemResults1 = await db.query(query, [
    email,
    limit,
    pageNum * limitNum,
  ])
  const itemResults2 = await db.query(userBookmarkSelectQuery, [
    email,
    limit,
    pageNum * limitNum,
  ])

  const countResults1 = await db.query(countSelectQuery, [email])
  const countResults2 = await db.query(userBookmarksCountSelectQuery, [email])

  const bookmarks1 = itemResults1.rows
  const bookmarks2 = itemResults2.rows
  const concatBookmarks = bookmarks1.concat(bookmarks2)
  const total1 = countResults1.rows[0].count || 0
  const total2 = countResults2.rows[0].count || 0
  const sumTotal = Number(total1) + Number(total2)

  return [concatBookmarks||[], sumTotal||0]
}


//  GET | 북마크 조회 처리
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || 0
  const limit = req.nextUrl.searchParams.get('limit') || 5

  const pageNum = Number(page)
  const limitNum = Number(limit)

  try {
    const db = await openDB()

    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    const jwtEmail = user.email
    const [concatBookmarks, sumTotal] = await dbQueryModule(db, jwtEmail as string, { limit, pageNum, limitNum }) || [null, null]

    // 존재하는 경우
    return NextResponse.json({
      ...HTTP_CODE.OK,
      bookmarks: {
        bookmarks: concatBookmarks,
        totalCount: sumTotal,
      },
    })
  } catch (error) {
    console.error('/api/bookmark/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}


// POST | 북마크 추가 처리
export async function POST(req: NextRequest) {
  const { '0': body } = await req.json()
  const { quoteId, url } = body || { quoteId: null, url: '' }

  const type = url.split('?')[1].split('=')[1]


  const selectQuery = type === 'no-user' ? `
  SELECT A.user_id AS user_id, A.quote_id AS quote_id, B.email AS email 
  FROM bookmarks A 
  JOIN users B ON A.user_id = B.user_id
  WHERE email = $1 AND quote_id = $2
  ` : `

  SELECT A.user_id AS user_id, A.user_quote_id AS quote_id, B.email AS email
  FROM user_bookmarks A
  JOIN users B ON A.user_id = B.user_id
  WHERE email = $1 AND A.user_quote_id = $2

`

  const insertQuery = type === 'no-user' ? `
  INSERT INTO bookmarks(user_id, quote_id , quote_url)
  VALUES ($1, $2, $3)
  ` : `

  INSERT INTO user_bookmarks(user_id, user_quote_id, quote_url)
  VALUES ($1, $2, $3)
  `



  try {
    const db = await openDB()

    // 토큰 유효성 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json({ ...HTTP, meg: '로그인  후 이용 가능합니다.' })

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
