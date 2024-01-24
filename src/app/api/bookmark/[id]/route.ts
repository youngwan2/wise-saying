import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'
import { accessTokenVerify } from '@/utils/validation'

// 북마크 삭제
export async function DELETE(
  req: NextRequest,
  res: { params: { id: string } },
) {
  const { id: quoteId } = res.params

  const db = await openDb()

  // 토큰 유효성 검증
  const { status, meg, success, user } = accessTokenVerify(req)

  if (status === 400) {
    return NextResponse.json({ status, success, meg })
  }

  if (status === 401) {
    return NextResponse.json({ status, success, meg })
  }

  // 검증 통과 후 처리
  const { userId } = user

  const query = `
    DELETE FROM bookmarks
    WHERE quote_id = ? AND user_id = ?
`
  try {
    await db.get(query, [quoteId, userId])
    db.close()
    return NextResponse.json({
      meg: '정상적으로 처리되었습니다.',
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
