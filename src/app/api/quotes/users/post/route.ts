import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { oauth2UserInfoExtractor, tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'

const insertQuery = `
INSERT INTO quotes(quote, category, author,job, user_id)
VALUES ($1,$2,$3,$4,$5)
`

// POST | 유저가 작성한 포스트 등록(추가) 요청
export async function POST(req: NextRequest) {
  const db = await openDB()
  const { '0': body } = await req.json()
  const { category, content: quote, author } = body

  const { userId: socialUserId } = (await oauth2UserInfoExtractor()) || {
    userId: '',
    email: '',
  }

  try {
    // 소셜 로그인 ⭕
    if (socialUserId) {
      await db.query(insertQuery, [
        quote,
        category.trim(),
        author,
        '사용자',
        socialUserId,
      ])
      await db.end()
      return NextResponse.json(HTTP_CODE.NO_CONTENT)
    }

    // 소셜 로그인 ❌ |  토큰 유효성 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    const { sub: userId } = user

    await db.query(insertQuery, [
      quote,
      category.trim(),
      author,
      '사용자',
      userId,
    ])

    await db.end()
    return NextResponse.json(HTTP_CODE.NO_CONTENT)
  } catch (error) {
    console.error('/api/quotes/users/post/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
