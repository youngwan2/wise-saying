import { HTTP_CODE } from '@/app/http-code'
import { oauth2UserInfoExtractor, tokenVerify } from '@/utils/auth'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

// GET | 대댓글 조회
export async function GET(req: NextRequest) {
  const commentId = req.nextUrl.searchParams.get('comment-id')

  try {
    const db = await openDB()
    const selectQuery = `
            SELECT reply_id AS id, content,  nickname, email, A.created_at
            FROM replies A INNER JOIN users B 
            ON A.user_id = B.user_id
            WHERE comment_id = $1
            ORDER BY reply_id ASC
        `

    const selectResult = await db.query(selectQuery, [commentId])
    const totalCount = selectResult.rowCount
    const replies = selectResult.rows

    return NextResponse.json({
      ...HTTP_CODE.CREATED,
      replies,
      totalCount,
    })
  } catch (error) {
    console.error('GET /api/quotes/:id/comments/reply', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}

const selectQuery = `
SELECT reply_id AS id, content,  nickname, email, A.created_at
FROM replies A INNER JOIN users B 
ON A.user_id = B.user_id
WHERE comment_id = $1
`
const insertQuery = `
INSERT INTO replies(comment_id, user_id, content)
VALUES ($1, $2, $3)
`
// POST | 대댓글 등록
export async function POST(req: NextRequest) {
  const { '0': content } = (await req.json()) || { content: '' }

  const commentId = req.nextUrl.searchParams.get('comment-id') || ''
  const LENGTH_LESS_THAN_ONE = content.length < 1
  const db = await openDB()

  if (LENGTH_LESS_THAN_ONE)
    return NextResponse.json({
      ...HTTP_CODE.BAD_REQUEST,
      meg: '잘못된 요청입니다. 문자는 최소 1자 이상 입력하여야 합니다.',
    })

  try {
    const { userId: soicalUserId } = (await oauth2UserInfoExtractor()) || {
      email: '',
      userId: '',
    }

    // 소셜 로그인
    if (soicalUserId) {
      await db.query(insertQuery, [commentId, soicalUserId, content])
      const selectResult = await db.query(selectQuery, [commentId])
      const totalCount = selectResult.rowCount
      const replies = selectResult.rows

      return NextResponse.json({
        ...HTTP_CODE.CREATED,
        replies,
        totalCount,
      })
    }

    // 일반 로그인
    const { user, ...HTTP } = tokenVerify(req, true) as any

    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    const { sub: userId } = user

    await db.query(insertQuery, [commentId, userId, content])
    const selectResult = await db.query(selectQuery, [commentId])
    const totalCount = selectResult.rowCount
    const replies = selectResult.rows

    return NextResponse.json({
      ...HTTP_CODE.CREATED,
      replies,
      totalCount,
    })
  } catch (error) {
    console.error('POST /api/quotes/:id/comments/reply', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}

const updateQuery = `
UPDATE replies
SET content = $1
WHERE reply_id = $2
`

// PATCH | 대댓글 수정
export async function PATCH(req: NextRequest) {
  const { '0': content } = (await req.json()) || ''

  const replyId = req.nextUrl.searchParams.get('reply-id') || ''
  const db = await openDB()

  const LENGTH_LESS_THAN_ONE = content.length < 1

  if (LENGTH_LESS_THAN_ONE)
    return NextResponse.json({
      ...HTTP_CODE.BAD_REQUEST,
      meg: '잘못된 요청입니다. 문자는 최소 1자 이상 입력하여야 합니다.',
    })

  try {
    const { userId: soicalUserId } = (await oauth2UserInfoExtractor()) || {
      email: '',
      userId: '',
    }

    // 소셜 로그인
    if (soicalUserId) {
      await db.query(updateQuery, [content, replyId])
      return NextResponse.json(HTTP_CODE.CREATED)
    }

    // 일반 로그인
    const { user, ...HTTP } = tokenVerify(req, true) as any

    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    await db.query(updateQuery, [content, replyId])
    return NextResponse.json(HTTP_CODE.CREATED)

  } catch (error) {
    console.error('PATCH /api/quotes/:id/comments/reply', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}

const deleteQuery = `
DELETE FROM replies
WHERE reply_id = $1
`

// DELETE | 대댓글 삭제
export async function DELETE(req: NextRequest) {
  const replyId = req.nextUrl.searchParams.get('reply-id') || ''
  const db = await openDB()

  try {
    const { userId: soicalUserId } = (await oauth2UserInfoExtractor()) || {
      email: '',
      userId: '',
    }

    // 소셜 로그인
    if (soicalUserId) {
      await db.query(deleteQuery, [replyId])
      return NextResponse.json(HTTP_CODE.CREATED)
    }

    // 일반 로그인
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    await db.query(deleteQuery, [replyId])
    return NextResponse.json(HTTP_CODE.CREATED)

  } catch (error) {
    console.error('DELTE /api/quotes/:id/comments/reply', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
