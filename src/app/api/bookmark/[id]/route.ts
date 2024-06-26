import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'

const deleteQuery = `
DELETE FROM bookmarks
USING users
WHERE bookmarks.user_id = users.user_id AND bookmarks.quote_id = $1 AND users.email = $2
`

const userBookmarkDeleteQuery = `
DELETE FROM user_bookmarks A
USING users B
WHERE A.user_id = B.user_id AND A.user_quote_id = $1 AND B.email = $2

`

// DELETE | 북마크 삭제
export async function DELETE(
  req: NextRequest,
  res: { params: { id: string } },
) {
  const { id: quoteId } = res.params
  const type = req.nextUrl.searchParams.get('type')

  const selectedQuery = type === 'no-user' ? deleteQuery : userBookmarkDeleteQuery

  const db = await openDB()
  try {

    // 일반 로그인 | 토큰 유효성 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    // 검증 통과 후 처리
    const { email: dbEmail } = user

    await db.query(selectedQuery, [quoteId, dbEmail])
    db.end()
    return NextResponse.json(HTTP_CODE.NO_CONTENT)

  } catch (error) {
    console.error('/api/bookmark/[id]/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
