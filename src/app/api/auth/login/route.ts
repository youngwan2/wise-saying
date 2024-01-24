import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import { openDb } from '@/connect'

export async function POST(req: NextRequest) {
  try {
    const scrept = process.env.JWT_SCREPT as string
    const db = await openDb()

    // 0. 이메일로 유저 정보 찾기
    const { email, password } = await req.json()

    const query = `
        SELECT user_id, email, password,profile_image, nickname FROM users_group
        WHERE email = ?
    `
    const user = await db.get(query, [email])

    // 1. 유저 유효성 판단
    if (!user)
      return NextResponse.json({
        success: false,
        meg: '유저 정보(이메일) 존재하지 않거나, 잘못 입력하였습니다.',
        status: 400,
      })

    // 1-2. 데이터베이스에서 가져온 데이터 저장
    const {
      email: dbEmail,
      password: dbPassword,
      user_id: userId,
      profile_image,
      nickname,
    } = user

    // 2. 유효한 비밀번호 인지 판단
    const vaildPw = await bycrypt.compare(password, dbPassword)

    if (!vaildPw)
      return NextResponse.json({
        success: false,
        meg: '비밀번호가 일치하지 않습니다.',
        status: 400,
      })

    // 3. 액세스 토큰 발급
    const createAccessToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: { dbEmail, userId },
      },
      scrept,
    )

    // 4. 토큰 디코딩 후 클라이언트로 응답
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

    // 5. 그 외 에러 처리
  } catch (error) {
    console.error('/api/auth/login/route.ts',error)

    return NextResponse.json({
      success: false,
      meg: ' 서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      status: 500,
    })
  }
}
