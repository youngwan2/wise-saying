import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { createToken, tokenVerify } from './utils/auth'
export async function middleware(req: NextRequest) {

  const refreshToken = cookies().get('refreshToken')?.value

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/', req.url))
  }


  if (refreshToken) {
    const decode = jwt.decode(refreshToken) as jwt.JwtPayload
    if(!decode) return
    const exp = decode.exp
    if (!exp) return

    // 토큰 만료 1분전 체크
    const tokenExpire60SecAgo = exp - Date.now() / 1000 <= 60

    if (tokenExpire60SecAgo) {
      const { status, user } = tokenVerify(req, false)
      const statusIncludes401or400 = [400, 401].includes(status || 0)

      if (!statusIncludes401or400) {
        const { email: userEmail, sub: userId } = user
        const newRefreshToken = createToken({ userEmail, userId }, false)

        cookies().set({
          name: 'refreshToken', // 쿠키 이름
          value: 'Bearer ' + newRefreshToken, // 쿠키에 저장할 값
          httpOnly: true, // 자바스크립트로 접근 불가능(Only HTTP 로만 전송 가능, XSS 공격 방지)
          secure: true, // 오직 안전한 연결인 HTTPS 에서만 사용가능(로컬 환경에서는 http 허용 해줌)
          path: '/', // 쿠키에 접근할 수 있는 사이트 경로
        })
      }

    }
  }
}

// 일치하는 경로만 미들웨어가 실행된다.
export const config = {
  matcher: ['/add-wisesaying', '/update-wisesaying','/logout'],
}
