import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { tokenVerify } from '@/utils/auth'

// POST | 유저가 작성한 포스트 등록(추가) 요청
export async function POST(req: NextRequest) {
  // 토큰 유효성 검증
  const { status, meg, success, user } = tokenVerify(req,true)

  if (status === 400) {
    return NextResponse.json({ status, success, meg })
  }

  if (status === 401) {
    return NextResponse.json({ status, success, meg })
  }

  const { sub: userId } = user

  try {
    const db = await openDB()
    const { category, content: quote, author } = await req.json()

    const insertQuery = `
              INSERT INTO quotes(quote, category, author,job, user_id)
              VALUES ($1,$2,$3,$4,$5)
          `
    await db.query(insertQuery, [
      quote,
      category.trim(),
      author,
      '사용자',
      userId,
    ])
    await db.end()
    return NextResponse.json({
      status: 201,
      success: true,
      meg: '정상적으로 처리되었습니다.',
    })
  } catch (error) {
    console.error('/api/quotes/users/post/route.ts', error)
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버 측 문제 입니다. 나중에 다시 시도 해주세요.',
    })
  }
}
