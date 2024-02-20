import { openDB } from '@/utils/connect'
import joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'

// POST | 회원가입 시 유저가 이미 존재하는지 검증
const USER_MATCH_COUNT = 0

export async function POST(req: NextRequest) {
  try {
    const { '0': email } = await req.json()

    // 이메일 유효성 검사
    const schema = joi.object({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
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
    const queriedUserCount = results.rowCount || 0

    db.end()
    if (queriedUserCount > USER_MATCH_COUNT) {
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
