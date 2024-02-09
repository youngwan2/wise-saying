import { NextRequest, NextResponse } from 'next/server'
import { createToken, tokenVerify } from '@/utils/auth'

export async function POST(req: NextRequest) {

    try {
      // refresh 토큰 검증(쿠키에 저장되어 있으므로 verify 함수 내부에서 처리한다.)
      const { status, meg, success, user } = tokenVerify(req, false)

      if (status === 400) {
        return NextResponse.json({ status, success, meg })
      }

      if (status === 401) {
        return NextResponse.json({ status, success, meg })
      }

      const { email: userEmail, sub: userId } = user

      // 새 토큰 생성(refreshToken 검증 후 디코딩된 jwt 에서 반환받은 유저 정보를 바탕으로 accessToken을 생성한다.)
      const newAccessToken = createToken({ userEmail, userId }, true)
      return NextResponse.json({
        meg: '새로운 토큰이 발급되었습니다.',
        accessToken: newAccessToken,
        status: 201,
        success: true,
      })
    } catch (error) {
      console.error('/api/auth/access', error)
      return NextResponse.json({
        meg: '토큰 발급에 실패하였습니다.',
        status: 500,
        success: false,
      })
    }
}
