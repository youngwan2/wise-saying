import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'

interface ItemsType {
  items: {
    id: number
    author: string
  }[]
}

export async function GET(req: NextRequest) {
  try {
    const db = await openDb()
    const type = req.nextUrl.searchParams.get('type')

    // 카테고리 갯수 반환
    if (type === 'meta') {
      const query = `
         SELECT COUNT(DISTINCT author) AS count FROM quotes_all
      `
      const count = await db.get(query)
      return NextResponse.json(
        count
      )
    }

    // 카테고리 목록 반환

    const page = req.nextUrl.searchParams.get('page') || 0
    const limit = req.nextUrl.searchParams.get('limit') || 30

    const query = `
      SELECT DISTINCT author AS category FROM quotes_all
      LIMIT ? OFFSET ? * ?
    `
    const items: ItemsType = await db.all(query, [limit, limit, page])
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버측에서 문재가 발생하였습니다. 나중에 다시시도해주세요.',
    })
  }
}
