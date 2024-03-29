import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { oauth2UserInfoExtractor, tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'

// GET | 단일 포스트 조회
export async function GET(req: NextRequest, res: { params: { id: number } }) {
  try {
    const postId = res.params.id
    const db = await openDB()
    const query = `
    SELECT quote_id, quote, category, author, B.email
    FROM quotes A 
    JOIN users B
    ON A.user_id = B.user_id 
    WHERE quote_id = $1
    LIMIT 1
`
    const result = await db.query(query, [postId])
    const item = result.rows[0]
    db.end()

    return NextResponse.json({
      ...HTTP_CODE.OK,
      item,
    })
  } catch (error) {
    console.log('/api/quotes/user/post/[id]/route.ts:', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}

const updateQuery = `
UPDATE quotes
SET quote = $1, category = $2, author = $3
WHERE quote_id = $4
`

// PATCH | 단일 포스트 수정
export async function PATCH(req: NextRequest, res: { params: { id: number } }) {
  const db = await openDB()
  const postId = res.params.id
  const { '0': body } = await req.json()
  const { content: quote, category, author } = body

  const { userId: socialUserId } = (await oauth2UserInfoExtractor()) || {
    userId: '',
    email: '',
  }

  try {
    // 소셜 로그인 ⭕
    if (socialUserId) {
      await db.query(updateQuery, [quote, category, author, postId])
      await db.end()
      return NextResponse.json(HTTP_CODE.NO_CONTENT)
    }

    // 일반로그인 |  접근 토큰 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)
    await db.query(updateQuery, [quote, category, author, postId])

    await db.end()
    return NextResponse.json(HTTP_CODE.NO_CONTENT)
  } catch (error) {
    console.error('/api/users/post/route.ts', error)

    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}

const deleteQuery = `
DELETE FROM quotes
WHERE quote_id = $1
`
// DELETE | 단일 포스트 삭제
export async function DELETE(
  req: NextRequest,
  res: { params: { id: string } },
) {
  const { id } = res.params

  try {
    const db = await openDB()
    const { userId: socialUserId } = (await oauth2UserInfoExtractor()) || {
      userId: '',
      email: '',
    }

    // 소셜 로그인 ⭕
    if (socialUserId) {
      db.query(deleteQuery, [id])

      return NextResponse.json({
        status: 201,
        success: true,
        meg: '성공적으로 처리 되었습니다.',
      })
    }

    // 일반 로그인 | 토큰 검증 및 에러 처리
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    // 토큰 검증 성공 후 처리
    db.query(deleteQuery, [id])

    return NextResponse.json(HTTP_CODE.NO_CONTENT)
  } catch (error) {
    console.error('/api/quotes/user/post/[id]/route.ts', error)

    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
