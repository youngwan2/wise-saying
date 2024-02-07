import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'

/**
 * * accessToken 유효성 검증
 * @param req NextRequest
 * @returns 반환 {meg, status, success, user}
 */
export const accessTokenVerify = (req: NextRequest) => {
  const rawToken = req.headers.get('authorization')?.split(' ') || []
  const token = rawToken[1]
  const scrept = process.env.JWT_SCREPT || ''
  const prefix = 'Bearer'

  try {
    if (prefix !== rawToken[0] || !token) {
      return {
        meg: '정상적인 accessToken 요청 형식이 아닙니다. 접두사를 확인해주세요.',
        status: 400,
        success: false,
      }
    }

    const decode = jwt.verify(token, scrept) as JwtPayload
    const user = decode.data
    return { user }
  } catch (error) {
    console.error('/utis/validation.ts', error)
    return {
      meg: '토큰이 만료되었습니다. 다시 로그인을 시도해주세요.',
      status: 401,
      success: false,
    }
  }
}
