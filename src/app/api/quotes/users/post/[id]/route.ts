import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { tokenVerify } from '@/utils/auth'

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
      meg: '성공적으로 처리되었습니다.',
      status: 200,
      item,
      success: true,
    })
  } catch (error) {
    console.log('/api/quotes/user/post/[id]/route.ts:', error)
    return NextResponse.json({
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      status: 500,
      success: false,
    })
  }
}

// PATCH | 단일 포스트 수정
export async function PATCH(req: NextRequest, res: { params: { id: number } }) {
  try {
    const db = await openDB()

    //  접근 토큰 검증
    const { status, meg, success } = tokenVerify(req, true)

    if (status === 400) return NextResponse.json({ status, success, meg })
    if (status === 401) return NextResponse.json({ status, success, meg })

    const postId = res.params.id
    const { '0': body } = await req.json()
    const { content: quote, category, author } = body

    const query = `
            UPDATE quotes
            SET quote = $1, category = $2, author = $3
            WHERE quote_id = $4
        `

    await db.query(query, [quote, category, author, postId])
    await db.end()
    return NextResponse.json({
      status: 201,
      success: true,
      meg: '요청을 성공적으로 처리하였습니다.',
    })
  } catch (error) {
    console.error('/api/users/post/route.ts', error)

    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  }
}

// DELETE | 단일 포스트 삭제
export async function DELETE(
  req: NextRequest,
  res: { params: { id: string } },
) {
  const { id } = res.params

  try {
    const db = await openDB()

    // 토큰 검증 및 에러 처리
    const { status, meg, success, user } = tokenVerify(req, true)

    if (status === 400) return NextResponse.json({ status, success, meg })
    if (status === 401) return NextResponse.json({ status, success, meg })

    // 토큰 검증 성공 후 처리
    const { sub: userId } = user
    const query = `
            DELETE FROM quotes
            WHERE quote_id = $1 AND user_id = $2
        `
    db.query(query, [id, userId])

    return NextResponse.json({
      status: 201,
      success: true,
      meg: '성공적으로 처리 되었습니다.',
    })
  } catch (error) {
    console.error('/api/quotes/user/post/[id]/route.ts', error)

    return NextResponse.json({
      status: 500,
      success: false,
      message: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요',
    })
  }
}
