import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'
import { accessTokenVerify } from '@/utils/validation'
import { revalidateTag } from 'next/cache'


// POST | 유저 프로필 정보 업데이트
export async function POST(req: NextRequest) {

  const tag = req.nextUrl.searchParams.get('tag')
  try {
    const db = await openDb()
    const { nickname, profile_image } = await req.json()

    // 토큰 유효성 검증
    const { status, meg, success, user } = accessTokenVerify(req)

    if (status === 400) {
      return NextResponse.json({ status, success, meg })
    }

    if (status === 401) {
      return NextResponse.json({ status, success, meg })
    }

    // 검증 통과 후 유저 프로필 업로드 처리
    const { dbEmail, userId } = user

    const query = `
            UPDATE users_group 
            SET nickname = ?, profile_image = ?
            WHERE email = ? AND user_id = ?
            `
    await db.all(query, [nickname, profile_image, dbEmail, userId])

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