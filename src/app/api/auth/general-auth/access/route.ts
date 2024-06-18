import { NextRequest, NextResponse } from 'next/server'
import { createToken, tokenExpCalculator, tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'

export async function POST(req: NextRequest) {

  try {
    // refresh 토큰 검증(쿠키에 저장되어 있으므로 verify 함수 내부에서 처리한다.)
    const { user, ...HTTP } = tokenVerify(req, false) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)
    
    const { email: userEmail, sub: userId } = user

    // 새 토큰 생성(refreshToken 검증 후 디코딩된 jwt 에서 반환받은 유저 정보를 바탕으로 accessToken을 생성한다.)
    const newAccessToken = createToken({ userEmail, userId }, true)

    const exp = tokenExpCalculator(newAccessToken, true)


    return NextResponse.json({
      ...HTTP_CODE.CREATED,
      exp,
      accessToken: newAccessToken,
    })
  } catch (error) {
    console.error('/api/auth/access', error)
    return NextResponse.json({ ...HTTP_CODE.INTERNAL_SERVER_ERROR })
  }
}
