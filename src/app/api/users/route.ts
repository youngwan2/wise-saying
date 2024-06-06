import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/utils/connect'
import { tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'

const query = `
SELECT user_id, email, nickname, profile_img_url AS profile_image FROM users
WHERE user_id = $1
`

// GET | 유저 프로필 정보 요청
export async function GET(req: NextRequest) {
  req.headers

  const db = await openDB()

  try {
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    // 검증 후 처리
    const { sub: userId } = user

    const results = await db.query(query, [userId])
    const userInfo = results.rows[0]
    await db.end()

    return NextResponse.json({
      ...HTTP_CODE.OK,
      userInfo,
    })
  } catch (error) {
    console.error('/api/users/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
