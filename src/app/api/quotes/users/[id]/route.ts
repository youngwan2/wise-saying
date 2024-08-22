import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'
import { aiProfanityFilter } from '@/ai'

// GET | 단일 포스트 조회
export async function GET(req: NextRequest, res: { params: { id: number } }) {
  try {
    const postId = res.params.id
    const db = await openDB()
    const query = `
    SELECT A.user_quote_id AS quote_id, quote, category, author, email
    FROM user_quotes A 
    JOIN users B
    ON A.user_id = B.user_id 
    WHERE A.user_quote_id = $1
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
UPDATE user_quotes
SET quote = $1, category = $2, author = $3
WHERE user_quote_id = $4
`

// PATCH | 단일 포스트 수정
export async function PATCH(req: NextRequest, res: { params: { id: number } }) {
  const db = await openDB()
  const postId = res.params.id
  const { '0': body } = await req.json()
  const { content: quote, category, author } = body


  const filterJson = await aiProfanityFilter([category, quote, author]) || '{"judgment": false, "reason": "" }'

  const { judgment, reason } = JSON.parse(filterJson)

  if (judgment) {
    return NextResponse.json({ ...HTTP_CODE.BAD_REQUEST, meg: reason })
  }

  try {
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
DELETE FROM user_quotes
WHERE user_quote_id = $1
`
// DELETE | 단일 포스트 삭제
export async function DELETE(
  req: NextRequest,
  res: { params: { id: string } },
) {
  const { id } = res.params

  try {
    const db = await openDB()

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
