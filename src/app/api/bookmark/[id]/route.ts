import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { oauth2UserInfoExtractor, tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'

const query = `
DELETE FROM bookmarks
USING users
WHERE bookmarks.user_id = users.user_id AND bookmarks.quote_id = $1 AND users.email = $2
`

// DELETE | 북마크 삭제
export async function DELETE(
  req: NextRequest,
  res: { params: { id: string } },
) {
  const { id: quoteId } = res.params
  const db = await openDB()

  try {
    const { userId: socialUserId, email } = (await oauth2UserInfoExtractor()) || {
      userId: '',
    }
    // 소셜 로그인
    if (socialUserId) {
      await db.query(query, [quoteId, email])
      db.end()
      return NextResponse.json(HTTP_CODE.NO_CONTENT)

    }

    // 일반 로그인 | 토큰 유효성 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    // 검증 통과 후 처리
    const { sub: userId, email:dbEmail } = user

    await db.query(query, [quoteId, dbEmail ])
    db.end()
    return NextResponse.json(HTTP_CODE.NO_CONTENT)

  } catch (error) {
    console.error('/api/bookmark/[id]/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
