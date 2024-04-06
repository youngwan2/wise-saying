import { openDB } from '@/utils/connect'
import { oauth2UserInfoExtractor, tokenVerify } from '@/utils/auth'
import { NextRequest, NextResponse } from 'next/server'
import { HTTP_CODE } from '@/app/http-code'
import { aiProfanityFilter } from '@/ai'

// GET | 특정 포스트 댓글 조회
export async function GET(req: NextRequest, res: { params: { id: string } }) {
  const quoteId = res.params.id
  const sort = req.nextUrl.searchParams.get('sort') || 'DESC'

  try {
    const db = await openDB()
    const page = req.nextUrl.searchParams.get('page') || 0
    const pageNum = Number(page)
    const limit = 5

    const countQuery = `
                SELECT COUNT(*) AS count
                FROM users A
                JOIN usercomments B ON A.user_id = B.user_id
                WHERE quote_id = $1
            `

    const userQuery = `
                SELECT B.comment_id AS id, A.email AS email, A.nickname AS nickname, A.profile_img_url AS profile_image, B.comment AS comment, B.created_at AS created_at
                FROM users A
                JOIN usercomments B ON A.user_id = B.user_id
                WHERE quote_id = $1
                ORDER BY B.comment_id ${sort}
                LIMIT $2 OFFSET $3
            `
    const countResults = await db.query(countQuery, [quoteId])
    const totalCount = countResults.rowCount || 0
    const commentResults = await db.query(userQuery, [
      quoteId,
      limit,
      pageNum * limit,
    ])
    const comments = commentResults.rows
    db.end()

    return NextResponse.json({
      ...HTTP_CODE.OK,
      comments,
      totalCount,
    })
  } catch (error) {
    console.error('/api/quotes/[id]/comments/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}

const insertQuery = `
INSERT INTO usercomments(comment, user_id, quote_id)
VALUES ($1,$2,$3)
`

// POST | 댓글 등록
export async function POST(req: NextRequest, res: { params: { id: string } }) {
  const { '0': comment } = await req.json()
  const quoteId = res.params.id

  const filterJson = await aiProfanityFilter([comment]) || '{"judgment": false, "reason": "" }'
  const { judgment, reason } = JSON.parse(filterJson)

  if (judgment) {
    return NextResponse.json({ ...HTTP_CODE.BAD_REQUEST, meg: reason })
  }

  const db = await openDB()

  // 댓글 유효성 검사
  if (comment.length < 2)
    return NextResponse.json({
      ...HTTP_CODE.BAD_REQUEST,
      meg: '댓글 형식은 공백을 포함하여 2자 이상 입력해야 합니다.',
    })

  const { userId: socialUserId } = (await oauth2UserInfoExtractor()) || {
    email: '',
    userId: '',
  }

  try {
    // 소셜 로그인
    if (socialUserId) {
      db.query(insertQuery, [comment, socialUserId, quoteId])
      db.end()
      return NextResponse.json(HTTP_CODE.CREATED)
    }

    // 일반 로그인 | 토큰 유효성 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    const { sub: userId } = user

    db.query(insertQuery, [comment, userId, quoteId])
    db.end()
    return NextResponse.json(HTTP_CODE.CREATED)
  } catch (error) {
    console.error('/api/quotes/[id]/comments/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}

const updateQuery = `
UPDATE usercomments
SET comment = $1, updated_at = CURRENT_TIMESTAMP
WHERE user_id = $2 AND comment_id = $3
`
// PATCH | 특정 포스트 댓글 수정
export async function PATCH(req: NextRequest, res: { params: { id: string } }) {
  const commentId = res.params.id
  const { '0': comment } = await req.json()

  // 댓글 유효성 검사
  if (comment.length < 2)
    return NextResponse.json({
      ...HTTP_CODE.BAD_REQUEST,
      meg: '댓글 형식은 공백을 포함하여 2자 이상 입력해야 합니다.',
    })

    const filterJson = await aiProfanityFilter([comment]) || '{"judgment": false, "reason": "" }'
    const { judgment, reason } = JSON.parse(filterJson)
  
    if (judgment) {
      return NextResponse.json({ ...HTTP_CODE.BAD_REQUEST, meg: reason })
    }

  const db = await openDB()

  try {
    const { userId: socialUserId } = (await oauth2UserInfoExtractor()) || {
      email: '',
      userId: '',
    }

    // 소셜 로그인
    if (socialUserId) {
      db.query(updateQuery, [comment, socialUserId, commentId])
      db.end()
      return NextResponse.json(
        HTTP_CODE.CREATED
      )
    }

    // 일반 로그인 | 토큰 유효성 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    const { sub: userId } = user

    await db.query(updateQuery, [comment, userId, commentId])
    db.end()
    return NextResponse.json(HTTP_CODE.CREATED)
  } catch (error) {
    console.error('/api/quotes/[id]/comments/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}

const deleteQuery = `
DELETE FROM usercomments
WHERE comment_id = $1
`

// DELECT | 특정 포스트 댓글 삭제
export async function DELETE(
  req: NextRequest,
  res: { params: { id: string } },
) {
  const db = await openDB()
  const commentId = res.params.id || ''

  try {
    // 소셜 로그인
    const { userId: socialUserId } = (await oauth2UserInfoExtractor()) || {
      email: '',
      userId: '',
    }
    if (socialUserId) {
      await db.query(deleteQuery, [commentId])
      db.end()
      return NextResponse.json(HTTP_CODE.NO_CONTENT)
    }

    // 일반 로그인 | 토큰 유효성 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    await db.query(deleteQuery, [commentId])
    db.end()
    return NextResponse.json(HTTP_CODE.NO_CONTENT)
  } catch (error) {
    console.error('/api/quotes/[id]/comments/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
