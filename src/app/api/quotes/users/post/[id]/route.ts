import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'
import { accessTokenVerify } from '@/utils/validation'

// GET | 단일 포스트 조회
export async function GET(req: NextRequest, res: { params: { id: number } }) {
  try {
    const postId = res.params.id
    const db = await openDb()
    const query = `
    SELECT user_quote_id, quote, category, author, B.email AS email
    FROM quotes_user A JOIN users_group B
    ON A.user_id = B.user_id 
    WHERE user_quote_id = ?
    LIMIT 1
`
    const item = await db.get(query, [postId])

    db.close()
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
export async function PATCH(
  req: NextRequest,
  res: { params: { id: number } },
) {
  try {
    const db = await openDb()
    const postId = res.params.id

    //  접근 토큰 검증
    const { status, meg, success } = accessTokenVerify(req)


    if (status === 400) {
        return NextResponse.json({ status, success, meg })
    }

    if (status === 401) {
        return NextResponse.json({ status, success, meg })
    }


    const { content: quote, category, author } = await req.json()

    const query = `
            UPDATE quotes_user 
            SET quote = ?, category = ?, author = ?
            WHERE user_quote_id = ?
        `

    db.all(query, [quote, category, author, postId])

    // db.close()
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
    const db = await openDb()

    // 토큰 검증 및 에러 처리
    const { status, meg, success } = accessTokenVerify(req)

    if (status === 400) {
      return NextResponse.json({ status, success, meg })
    }

    if (status === 401) {
      return NextResponse.json({ status, success, meg })
    }

    // 토큰 검증 성공 후 처리
    const query = `
            DELETE FROM quotes_user
            WHERE user_quote_id = ?
        `
    db.get(query, [id])
    console.log(status, meg, success)
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
