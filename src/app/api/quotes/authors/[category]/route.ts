import { openDb } from '@/connect'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(
  req: NextRequest,
  res: { params: { category: string } },
) {
  try {
    const { category } = res.params
    const limit = req.nextUrl.searchParams.get('limit') || 15
    const type = req.nextUrl.searchParams.get('type') || ''
    const db = await openDb()

    /**
     * 상세 페이지 정보(저자별 명언 목록)와 관련한 로직을 처리
     */

    // 타입이 meta인 경우 조회된 목록의 총 갯수와 최대 페이지를 구하여 반환
    if (type === 'meta') {
      const countSelectQuery = `
        SELECT COUNT(*) AS count FROM quotes_all
        WHERE author = ?
        `
      const result = await db.get(countSelectQuery, [category])
      const { count } = result
      const MAX_PAGE = Math.ceil(count / Number(limit))

      await db.close()
      return NextResponse.json({ TOTAL_COUNT: count, MAX_PAGE })
    }


    // 타입이 meta 이 아닌 경우 조회된 목록를 페이지네이션으로 처리하여 반환
    const page = req.nextUrl.searchParams.get('page') || 0
    const query = `
        SELECT quote_id AS id, author, quote, job FROM quotes_all
        WHERE author = ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?*15
    `

    const items = await db.all(query, [category, limit, page])
    await db.close()
    return NextResponse.json(items)


    // 그 외 에러 처리
  }
  catch (error) {
    console.error('/api/quotes/authors/[subCategory]/route.ts', error)
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버측에서 문재가 발생하였습니다. 나중에 다시시도해주세요.',
    })
  }
}