import { NextRequest, NextResponse } from 'next/server'
import Jwt from 'jsonwebtoken'
import { openDb } from '@/connect'

// 조회
export async function GET(
  req: NextRequest,
  res: { params: { category: string } },
) {
  try {
    const db = await openDb()
    const { category } = res.params
    const limit = req.nextUrl.searchParams.get('limit') || 15
    const type = req.nextUrl.searchParams.get('type')

    if (type === 'meta') {
      const countSelectQuery = `
            SELECT COUNT(*) AS count
            FROM quotes_user A JOIN users_group B
            ON A.user_id = B.user_id AND category = ?
        `
      const result = await db.get(countSelectQuery, [category])
      const { count } = result
      const MAX_PAGE = Math.ceil(count / Number(limit))

      await db.close()
      return NextResponse.json({ TOTAL_COUNT: count, MAX_PAGE })
    }

    const page = req.nextUrl.searchParams.get('page') || 0
    const query = `
        SELECT id, wise_sayings, category, author, B.email AS email
        FROM quotes_user A JOIN users_group B
        ON A.user_id = B.user_id AND category = ?
        LIMIT ? OFFSET ?*15
    `
    const items = await db.all(query, [category, limit, page])

    await db.close()
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ items: [] })
  }
}

// 수정
export async function PATCH(
  req: NextRequest,
  res: { params: { category: string } },
) {
  try {
    const db = await openDb()
    const postId = res.params.category
    const accessToken =
      req.headers.get('authorization')?.replace('Bearer ', '') || ''
    const scrept = process.env.JWT_SCREPT!
    const { wise_sayings, category, author } = await req.json()

    const validToken = Jwt.verify(accessToken, scrept)

    if (!validToken) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: '유효 토큰이 만료되었습니다.',
      })
    }

    const query = `
            UPDATE quotes_user 
            SET wise_sayings = ?, category = ?, author = ?
            WHERE id = ?
        `

    db.all(query, [wise_sayings, category, author, postId])

    // db.close()
    return NextResponse.json({
      status: 201,
      success: true,
      meg: '요청을 성공적으로 처리하였습니다.',
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  }
}
