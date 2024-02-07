import { openDB } from '@/utils/connect'
import { accessTokenVerify } from '@/utils/validation'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// GET | 특정 포스트 댓글 조회
export async function GET(req: NextRequest, res: { params: { id: string } }) {
  const quoteId = res.params.id
  const tag = req.nextUrl.searchParams.get('tag') || ''
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
                SELECT B.comment_id AS id, A.email AS email, A.nickname AS nickname, A.profile_img_url AS profile_image, B.comment AS comment, B.created_at AS create_date
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
    revalidateTag(tag)
    db.end()
    return NextResponse.json({
      status: 200,
      meg: '정상적으로 처리되었습니다.',
      success: true,
      items: comments,
      totalCount,
    })
  } catch (error) {
    console.error('/api/quotes/[id]/comments/route.ts', error)
    return NextResponse.json({
      status: 500,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다사시도 해주세요.',
      success: false,
    })
  }
}

// POST | 댓글 등록
export async function POST(req: NextRequest, res: { params: { id: string } }) {
  const tag = req.nextUrl.searchParams.get('tag') || ''

  // 토큰 유효성 검증
  const { status, meg, success, user } = accessTokenVerify(req)
  if (status === 400) {
    return NextResponse.json({ status, success, meg })
  }

  if (status === 401) {
    return NextResponse.json({ status, success, meg })
  }

  const { comment } = (await req.json()) || { comment: '' }

  // 댓글 유효성 검사
  if (comment.length < 2)
    return NextResponse.json({
      status: 400,
      meg: '댓글 형식은 공백을 포함하여 2자 이상 입력해야 합니다.',
      success: false,
    })

  try {
    const db = await openDB()
    const { userId } = user
    const quoteId = res.params.id

    const query = `
            INSERT INTO usercomments(comment, user_id, quote_id)
            VALUES ($1,$2,$3)
            `
    db.query(query, [comment, userId, quoteId])
    revalidateTag(tag)
    db.end()
    return NextResponse.json({
      status: 201,
      meg: '정상적으로 처리되었습니다.',
      success: true,
    })
  } catch (error) {
    console.error('/api/quotes/[id]/comments/route.ts', error)
    return NextResponse.json({
      status: 500,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다사시도 해주세요.',
      success: false,
    })
  }
}

// PATCH | 특정 포스트 댓글 수정
export async function PATCH(req: NextRequest, res: { params: { id: string } }) {
  const commentId = res.params.id
  const { comment } = (await req.json()) || { comment: '' }
  const { status, meg, success, user } = accessTokenVerify(req)

  if (status === 400) {
    return NextResponse.json({ status, success, meg })
  }

  if (status === 401) {
    return NextResponse.json({ status, success, meg })
  }

  try {
    const db = await openDB()
    const { userId } = user
    const updateQuery = `
        UPDATE usercomments
        SET comment = $1, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $2 AND comment_id = $3
        `
    await db.query(updateQuery, [comment, userId, commentId])

    db.end()
    return NextResponse.json({
      status: 201,
      meg: '정상적으로 수정되었습니다.',
      success: true,
    })
  } catch (error) {
    console.error('/api/quotes/[id]/comments/route.ts', error)
    return NextResponse.json({
      status: 500,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다사시도 해주세요.',
      success: false,
    })
  }
}

// DELECT | 특정 포스트 댓글 삭제
export async function DELETE(
  req: NextRequest,
  res: { params: { id: string } },
) {
  try {
    const commentId = res.params.id
    // 토큰 유효성 검증
    const { status, meg, success, user } = accessTokenVerify(req)
    if (status === 400) {
      return NextResponse.json({ status, success, meg })
    }

    if (status === 401) {
      return NextResponse.json({ status, success, meg })
    }

    if (commentId) {
      const db = await openDB()
      const { userId } = user
      const userQuery = `
                DELETE FROM usercomments
                WHERE comment_id = $1 AND user_id = $2
            `
      await db.query(userQuery, [commentId, userId])
      db.end()
      return NextResponse.json({
        status: 200,
        meg: '정상적으로 삭제 처리되었습니다.',
        success: true,
      })
    }
  } catch (error) {
    console.error('/api/quotes/[id]/comments/route.ts', error)
    return NextResponse.json({
      status: 500,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다사시도 해주세요.',
      success: false,
    })
  }
}
