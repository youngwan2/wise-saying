import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import { oauth2UserInfoExtractor, tokenVerify } from '@/utils/auth'

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
    const { userId: socialUserId } = await oauth2UserInfoExtractor() || { userId: '' }

    if (socialUserId) {

      await db.query(query, [quoteId, socialUserId])
      db.end()
      return NextResponse.json({
        meg: '정상적으로 삭제 처리되었습니다.',
        status: 204,
        success: true,
      })
    }


    // 토큰 유효성 검증
    const { status, meg, success, user } = tokenVerify(req, true)

    if (status === 400) return NextResponse.json({ status, success, meg })
    if (status === 401) return NextResponse.json({ status, success, meg })

    // 검증 통과 후 처리
    const { sub: userId } = user

    await db.query(query, [quoteId, userId])
    db.end()
    return NextResponse.json({
      meg: '정상적으로 삭제 처리되었습니다.',
      status: 204,
      success: true,
    })
  } catch (error) {
    console.error('/api/bookmark/[id]/route.ts')
    return NextResponse.json({
      status: 500,
      meg: '사버에서 처리 중 문제가 발생 하였습니다. 나중에 다시 시도해주세요.',
    })
  }
}


