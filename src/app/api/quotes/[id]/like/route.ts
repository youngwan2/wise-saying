import { tokenVerify } from '@/utils/auth'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: { params: { id: string } }) {
  try {
    const db = await openDB()
    const quoteId = res.params.id

    const selectQuery = `
        SELECT COUNT(*) as count
        FROM quote_likes
        WHERE quote_id = $1
        `

    const result = await db.query(selectQuery, [quoteId])
    const likeCount = result.rows[0].count
    return NextResponse.json({
      meg: '정상적으로 처리되었습니다.',
      status: 201,
      success: true,
      likeCount,
      quoteId,
    })
  } catch (error) {
    console.error('GET /api/quotes/[id]/like', error)
    return NextResponse.json({
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      status: 500,
      success: false,
      likeCount: 0,
    })
  }
}

export async function POST(req: NextRequest, res: { params: { id: string } }) {
  try {
    const db = await openDB()
    const quoteId = res.params.id

    const { meg, status, success, user } = tokenVerify(req, true)

    if (status === 400) {
      return NextResponse.json({ status, success, meg })
    }

    if (status === 401) {
      return NextResponse.json({ status, success, meg })
    }

    const { sub: userId } = user

    const checkSelectQuery = `
        SELECT COUNT(*) as count
        FROM quote_likes
        WHERE user_id = $1 AND quote_id = $2
        `
    const insertQuery = `
        INSERT INTO quote_likes(user_id, quote_id)
        VALUES ($1, $2)
        `

    const likeCountSelectQuery = `
        SELECT COUNT(*) as count
        FROM quote_likes
        WHERE quote_id = $1
        `

    const checkResult = await db.query(checkSelectQuery, [userId, quoteId])
    const isLiked = checkResult.rows[0].count
    if (isLiked > 0) {
      return NextResponse.json({
        meg: '이미 처리된 요청입니다.',
        status: 409,
        success: false,
      })
    }
    await db.query(insertQuery, [userId, quoteId])
    const result = await db.query(likeCountSelectQuery, [quoteId])
    const likeCount = result.rows[0].count
    return NextResponse.json({
      meg: '정상적으로 처리되었습니다.',
      status: 201,
      success: true,
      likeCount,
      quoteId,
    })
  } catch (error) {
    console.error('POST /api/quotes/[id]/like', error)
    return NextResponse.json({
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      status: 500,
      success: false,
    })
  }
}
