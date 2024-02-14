import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

class User {
  userId!: number
  userEmail!: string
}

const scrept = process.env.JWT_SCREPT || ''

/**
 * 토큰 생성 후 반환
 * @returns 토큰 반환
 */
export const createToken = (
  user: Pick<User, 'userEmail' | 'userId'>,
  isAccessToken: boolean,
) => {
  const payload = {
    email: user.userEmail,
    sub: user.userId,
    type: isAccessToken ? 'access' : 'refresh',
  }

  const token = jwt.sign(
    {
      exp: isAccessToken
        ? Math.floor(Date.now() / 1000) + 60 * 7
        : Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), // 1달 = 30일
      data: payload,
    },
    scrept,
  )
  return token
}

/**
 * * accessToken 유효성 검증
 * @param req NextRequest
 * @returns 반환 {meg, status, success, user}
 */
export const tokenVerify = (req: NextRequest, isAccessToken: boolean) => {
  const rawToken = isAccessToken
    ? req.headers.get('authorization')?.split(' ') || [] // access
    : cookies().get('refreshToken')?.value.split(' ') || [] // refresh

  if (!rawToken)
    return {
      meg: '정상적인 token 요청 형식이 아닙니다. 접두사를 확인해주세요.',
      status: 400,
      success: false,
    }

  const token = rawToken[1]
  const scrept = process.env.JWT_SCREPT || ''
  const prefix = 'Bearer'

  try {
    if (prefix !== rawToken[0] || !token) {
      return {
        meg: '정상적인 token 요청 형식이 아닙니다. 접두사를 확인해주세요.',
        status: 400,
        success: false,
      }
    }
    const decode = jwt.verify(token, scrept) as JwtPayload
    const user = decode.data
    return { user }
  } catch (error) {
    console.error('/utis/validation.ts')
    return {
      meg: '토큰이 만료되었습니다. 다시 로그인을 시도해주세요.',
      status: 401,
      success: false,
    }
  }
}