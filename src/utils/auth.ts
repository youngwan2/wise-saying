

import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { auth } from '@/configs/config.auth'
import { openDB } from './connect'
import { HTTP_CODE } from '@/app/http-code'


class User {
  userId!: number
  userEmail!: string
}

const scrept = process.env.JWT_SCREPT || ''

/**
 * 토큰 생성 후 반환(TODO : 북마크 기능 개선 후 accessToken 만료 기간을 7분으로 지정)
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
        ? Math.floor(Date.now() / 1000) + 60 * 5
        : Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 1달 = 30일
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
    return HTTP_CODE.BAD_REQUEST
    

  const token = rawToken[1]
  const scrept = process.env.JWT_SCREPT || ''
  const prefix = 'Bearer'

  try {
    if (prefix !== rawToken[0] || !token) {
      return HTTP_CODE.BAD_REQUEST
      
    }
    const decode = (jwt.verify(token, scrept) as JwtPayload) || ''
    const user = decode.data

    return { user }
  } catch (error) {
    console.error('/utis/validation.ts')
    return HTTP_CODE.UNAUTHORIZED
    
  }
}

/**
 * 토큰의 만료시간(exp) 추출
 * @param token 토큰
 * @param isAccessToken accessToken 여부(false 인 경우 refreshToken)
 * @returns
 */
export function tokenExpCalculator(token: string, isAccessToken: boolean) {
  const decode = jwt.decode(token) as JwtPayload
  if (!decode) return
  const exp = decode.exp || 0

  return exp
}

export async function oauth2UserInfoExtractor() {
  try {
    const session = await auth()

    if (!session) return { userId: 0, email: '' }

    const { email } = session.user || { user: { email: '' } }

    const db = await openDB()
    const selectQuery = `
    SELECT user_id FROM users
    WHERE email = $1 AND provider = $2
    `

    const results = await db.query(selectQuery, [email, 'social'])
    const count = results.rowCount || 0
    const userId = results.rows[0].user_id

    if (count < 1) return { userId: 0, email: '' }

    return { userId, email }
  } catch (error) {
    console.error('utils/auth.ts : 소셜 로그인 유저정보 추출 실패:', error)
    return { userId: '', email: '' }
  }
}
