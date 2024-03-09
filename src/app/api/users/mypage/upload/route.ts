import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/utils/connect'
import { oauth2UserInfoExtractor, tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'

const query = `
UPDATE users
SET nickname = $1, profile_img_url = $2, updated_at = CURRENT_TIMESTAMP
WHERE email = $3 AND user_id = $4
`

// PATCH | 유저 프로필 정보 업데이트
export async function PATCH(req: NextRequest) {
  try {
    const db = await openDB()
    const { '0': body } = await req.json()
    const { nickname, profile_image } = body

    const { userId: socialUserId, email } =
      (await oauth2UserInfoExtractor()) || { userId: '', email: '' }

    if (socialUserId) {
      db.query(query, [nickname, profile_image, email, socialUserId])
      db.end()

      return NextResponse.json(HTTP_CODE.NO_CONTENT)
    }

    // 토큰 유효성 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    // 검증 통과 후 유저 프로필 업로드 처리
    const { email: dbEmail, sub: userId } = user
    await db.query(query, [nickname, profile_image, dbEmail, userId])
    db.end()

    return NextResponse.json(HTTP_CODE.NO_CONTENT)
  } catch (error) {
    console.error('/api/users/upload/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
