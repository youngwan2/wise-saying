import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'

/**
 * * accessToken 유효성 검증
 * @param req NextRequest
 * @returns user - accessToken 검증 후 반환하는 페이로드의 유저 정보를 반환
 */
export const accessTokenVerify = (req: NextRequest) => {
  const rawToken = req.headers.get('authorization')?.split(' ') || []
  const token = rawToken[1]
  const scrept = process.env.JWT_SCREPT || ''
  const prefix = 'Bearer'

  if (prefix !== rawToken[0]) {
    return NextResponse.json({
      meg: '정상적인 accessToken 요청 형식이 아닙니다. 접두사를 확인해주세요.',
      status: 400,
      success: false,
    })
  }

  if (!token) {
    return NextResponse.json({
      meg: '요청 토큰을 찾을 수 없습니다. 확인 후 양식에 맞춰서 다시 보내주세요.',
      status: 400,
      stateText: 'Bad Request',
      success: false,
    })
  }

  const decode = jwt.verify(token, scrept) as JwtPayload

  if (!decode) {
    return NextResponse.json({
      meg: '토큰이 만료되었습니다. 다시 로그인을 시도해주세요.',
      status: 401,
      success: false,
    })
  }

  const user = decode.data
  return user
}
