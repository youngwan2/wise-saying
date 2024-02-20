import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import bycrypt from 'bcrypt'
import { openDB } from '@/utils/connect'
import { createToken } from '@/utils/auth'
import { cookies } from 'next/headers'

// POST | 로그인 요청 처리
export async function POST(req: NextRequest) {
  try {
    const db = await openDB()

    // 0. 이메일로 유저 정보 찾기
    const { '0': body } = await req.json()
    const { email, password } = body

    const schema = Joi.object({
      email: Joi.string().email({
        maxDomainSegments: 2,
        tlds: { allow: [`com`, `net`] },
      }),
      password: Joi.string().pattern(
        new RegExp(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$/,
        ),
      ),
    })

    // 0-1. 요청 유저 정보의 유효성 판단
    const validResults = schema.validate({ email, password })

    if (validResults.error?.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        meg: validResults.error.message,
        status: 400,
      })
    }

    const query = `
        SELECT user_id, email, password,profile_img_url, nickname FROM users
        WHERE email = $1
    `
    const user = await db.query(query, [email])
    await db.end()

    // 1. 유저정보 유무 판단
    if (user.rows.length < 1)
      return NextResponse.json({
        success: false,
        meg: '등록한 정보가 존재하지 않습니다. 회원가입 후 다시시도 해주세요.',
        status: 400,
      })

    // 1-2. 데이터베이스에서 가져온 데이터 저장
    const {
      email: userEmail,
      password: userPassword,
      user_id: userId,
      profile_image,
      nickname,
    } = user.rows[0]

    // 2. 유효한 비밀번호 인지 판단
    const vaildPw = await bycrypt.compare(password, userPassword)

    if (!vaildPw)
      return NextResponse.json({
        success: false,
        meg: '비밀번호가 일치하지 않습니다.',
        status: 400,
      })

    // 3. 토큰 발급
    const accessToken = createToken({ userEmail, userId }, true)
    const refreshToken = createToken({ userEmail, userId }, false)

    // 4. 리프레쉬 토큰 투키 저장
    cookies().set({
      name: 'refreshToken', // 쿠키 이름
      value: 'Bearer ' + refreshToken, // 쿠키에 저장할 값
      httpOnly: true, // 자바스크립트로 접근 불가능(Only HTTP 로만 전송 가능, XSS 공격 방지)
      secure: true, // 오직 안전한 연결인 HTTPS 에서만 사용가능(로컬 환경에서는 http 허용 해줌)
      path: '/', // 쿠키에 접근할 수 있는 사이트 경로
    })

    return NextResponse.json({
      success: true,
      meg: '정상적으로 처리 되었습니다..',
      status: 201,
      email: userEmail,
      profile: { image: profile_image, nickname: nickname || '익명의 명인' },
      accessToken,
    })

    // 5. 그 외 에러 처리
  } catch (error) {
    console.error('/api/auth/login/route.ts', error)

    return NextResponse.json({
      success: false,
      meg: ' 서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      status: 500,
    })
  }
}
