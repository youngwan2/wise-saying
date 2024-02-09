import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/utils/connect'
import { tokenVerify } from '@/utils/auth'
import { revalidateTag } from 'next/cache'

// POST | 유저 프로필 정보 업데이트
export async function POST(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get('tag')
  try {
    const db = await openDB()
    const { nickname, profile_image } = await req.json()

    // 토큰 유효성 검증
    const { status, meg, success, user } = tokenVerify(req, true)

    if (status === 400) {
      return NextResponse.json({ status, success, meg })
    }

    if (status === 401) {
      return NextResponse.json({ status, success, meg })
    }

    // 검증 통과 후 유저 프로필 업로드 처리
    const { email: dbEmail, sub: userId } = user

    const query = `
            UPDATE users
            SET nickname = $1, profile_img_url = $2, updated_at = CURRENT_TIMESTAMP
            WHERE email = $3 AND user_id = $4
            `
    await db.query(query, [nickname, profile_image, dbEmail, userId])
    db.end()
    tag && revalidateTag(tag) // 업로드 후 데이터 재유효화(캐시 비우기)

    return NextResponse.json({
      meg: '성공적으로 처리되었습니다.',
      status: 201,
      success: true,
    })
  } catch (error) {
    console.error('/api/users/upload/route.ts', error)
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  }
}
