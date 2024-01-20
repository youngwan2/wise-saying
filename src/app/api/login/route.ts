import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import { openDb } from '@/connect'

export async function POST(req: NextRequest) {
  try {
    const scrept = process.env.JWT_SCREPT as string
    const db = await openDb()

    // 유저 정보
    const { email, password } = await req.json()
    const query = `
        SELECT user_id, email, password,profile_image, nickname FROM users_group
        WHERE email = ?
    `
    const user = await db.get(query, [email])

    // 유저 정보 존재 유무 판단
    if (!user)
      return NextResponse.json({
        success: false,
        meg: '유저 정보(이메일) 존재하지 않거나, 잘못 입력하였습니다.',
        status: 403,
      })
    const {
      email: dbEmail,
      password: dbPassword,
      user_id: userId,
      profile_image,
      nickname,
    } = user

    // 유효한 비밀번호 인지 판단
    const vaildPw = await bycrypt.compare(password, dbPassword)

    if (!vaildPw)
      return NextResponse.json({
        success: false,
        meg: '비밀번호가 일치하지 않습니다.',
        status: 403,
      })

    // 액세스 토큰 생성
    const createAccessToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: { dbEmail, userId },
      },
      scrept,
    )

    // 토큰 디코드
    const decode = jwt.verify(createAccessToken, scrept) as jwt.JwtPayload
    const { dbEmail: validEmail } = decode.data

    return NextResponse.json({
      success: true,
      meg: '정상적으로 처리 되었습니다..',
      status: 201,
      email: validEmail,
      profile: { image: profile_image, nickname },
      accessToken: createAccessToken,
    })

    // 에러 처리
  } catch (error) {
    return NextResponse.json({
      success: false,
      meg: ' 서버 측에서 예상치 못한 문제가 발생하였습니다. 나중에 다시 시도해주세요.',
      status: 500,
    })
  }
}
