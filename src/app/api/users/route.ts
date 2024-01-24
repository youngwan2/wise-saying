import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'
import { accessTokenVerify } from '@/utils/validation'

// POST | 회원가입 시 유저가 이미 존재하는지 검증
export async function POST(req: NextRequest) {
  try {
    const email = await req.json()
    const db = await openDb()

    const query = `
        SELECT * FROM users_group
        WHERE email = ?
    `
    const user = await db.get(query, [email])

    // 유저 정보가 있으면
    if (user) {
      return NextResponse.json({
        meg: '이미 존재하는 이메일 입니다.',
        status: 409,
        success: false,
      })
    }

    return NextResponse.json({
      meg: '존재하지 않는 이메일 입니다.',
      status: 201,
      success: true,
    })
  } catch (error) {
    console.error('/api/users/route.ts', error)
    return NextResponse.json({
      meg: '서버 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      status: 500,
      success: false,
    })
  }
}

// GET | 유저 프로필 정보 요청
export async function GET(req: NextRequest) {
  try {
    const db = await openDb()

    // 토큰 검증
    const { status, success, meg, user } = accessTokenVerify(req)

    if (status === 400) {
      return NextResponse.json({ status, success, meg })
    }

    if (status === 401) {
      return NextResponse.json({ status, success, meg })
    }


    // 검증 후 처리
    const { userId } = user
    const query = `
        SELECT user_id, email, nickname, profile_image FROM users_group
        WHERE user_id = ?
        `
    const items = await db.get(query, [userId])

    return NextResponse.json({
      meg: '정상처리되었습니다.',
      success: true,
      status: 200,
      items,
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
