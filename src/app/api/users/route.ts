import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/utils/connect'
import { tokenVerify } from '@/utils/auth'


// GET | 유저 프로필 정보 요청
export async function GET(req: NextRequest) {
  try {
    const db = await openDB()

    // 토큰 검증
    const { status, success, meg, user } = tokenVerify(req, true)

    if (status === 400) return NextResponse.json({ status, success, meg })
    if (status === 401) return NextResponse.json({ status, success, meg })

    // 검증 후 처리
    const { sub: userId } = user

    const query = `
        SELECT user_id, email, nickname, profile_img_url AS profile_image FROM users
        WHERE user_id = $1
        `
    const results = await db.query(query, [userId])
    const userInfo = results.rows[0]
    await db.end()
    return NextResponse.json({
      meg: '정상처리되었습니다.',
      success: true,
      status: 200,
      userInfo,
    })
  } catch (error) {
    console.error('/api/users/route.ts', error)
    return NextResponse.json({
      meg: '처리중입니다.',
      success: false,
      status: 500,
    })
  }
}
