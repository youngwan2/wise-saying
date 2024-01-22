import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'

// 단일 포스트 조회
export async function GET(req: NextRequest, res: { params: { id: number } }) {
  try {
    const postId = res.params.id
    const db = await openDb()
    const query = `
    SELECT id, wise_sayings, category, author, B.email AS email
    FROM quotes_user A JOIN users_group B
    ON A.user_id = B.user_id 
    WHERE id = ?
    LIMIT 1
`
    const item = await db.get(query, [postId])

    db.close()
    return NextResponse.json({
      meg: '성공적으로 처리되었습니다.',
      status: 200,
      item,
      success: true,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      status: 500,
      success: false,
    })
  }
}
