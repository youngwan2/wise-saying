import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/utils/connect'
import { accessTokenVerify } from '@/utils/validation'
import joi from 'joi'

// POST | 회원가입 시 유저가 이미 존재하는지 검증
export async function POST(req: NextRequest) {
  try {
    const email = await req.json()

    // 이메일 유효성 검사
    const schema = joi.object({
      email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })

    const vaildEmail = schema.validate({ email })

    if (vaildEmail.error) {
      return NextResponse.json({
        meg: '잘못된 형식의 이메일 입니다.',
        status: 400,
        success: false,
      })
    }

    // 유효한 이메일 형식이라면 유저정보 찾기
    const db = await openDB()
    const query = `
        SELECT * FROM users
        WHERE email = $1
    `
    const results = await db.query(query, [email])
    const userCount = results.rowCount
    db.end()
    if (userCount && userCount > 0) {
      return NextResponse.json({
        meg: '이미 존재하는 이메일 입니다.',
        status: 400,
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
    const db = await openDB()

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
        SELECT user_id, email, nickname, profile_img_url AS profile_image FROM users
        WHERE user_id = $1
        `
    const results = await db.query(query, [userId])
    const items = results.rows[0]

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
