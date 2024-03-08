import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { oauth2UserInfoExtractor, tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'

const query = `
DELETE FROM bookmarks
WHERE quote_id = $1 AND user_id = $2
`

// DELETE | 북마크 삭제
export async function DELETE(
  req: NextRequest,
  res: { params: { id: string } },
) {
  const { id: quoteId } = res.params
  const db = await openDB()

  try {
    const { userId: socialUserId } = (await oauth2UserInfoExtractor()) || {
      userId: '',
    }
    // 소셜 로그인
    if (socialUserId) {
      await db.query(query, [quoteId, socialUserId])
      db.end()
      return NextResponse.json(HTTP_CODE.NO_CONTENT)

    }

    // 일반 로그인 | 토큰 유효성 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    // 검증 통과 후 처리
    const { sub: userId } = user

    await db.query(query, [quoteId, userId])
    db.end()
    return NextResponse.json(HTTP_CODE.NO_CONTENT)

  } catch (error) {
    console.error('/api/bookmark/[id]/route.ts')
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
