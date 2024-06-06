import { HTTP_CODE } from '@/app/http-code'
import { tokenVerify } from '@/utils/auth'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

// GET | 좋아요 조회
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
      ...HTTP_CODE.CREATED,
      meg: '정상적으로 처리되었습니다.',
      likeCount,
      quoteId,
    })
  } catch (error) {
    console.error('GET /api/quotes/[id]/like', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}

const checkSelectQuery = `
SELECT COUNT(*) as count
FROM quote_likes A JOIN users B
ON A.user_id = B.user_id
WHERE B.email = $1 AND quote_id = $2
`
const deleteQuery = `
DELETE FROM quote_likes
USING users
WHERE users.user_id = quote_likes.user_id
AND quote_likes.quote_id= $2 AND users.email = $1 
`
const insertQuery = `INSERT INTO quote_likes(user_id, quote_id) VALUES ($1, $2)`
const likeCountSelectQuery = `SELECT COUNT(*) as count FROM quote_likes  WHERE quote_id = $1 `

// POST | 좋아요 증가
export async function POST(req: NextRequest, res: { params: { id: string } }) {
  try {
    const db = await openDB()
    const quoteId = res.params.id

    // 일반 로그인
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)


    const { sub: userId, email: jwtEmail } = user

    const checkResult = await db.query(checkSelectQuery, [jwtEmail, quoteId])
    const isLiked = checkResult.rows[0].count

    if (Number(isLiked) > 0) {
      await db.query(deleteQuery, [jwtEmail, quoteId])
      const result = await db.query(likeCountSelectQuery, [quoteId])
      const likeCount = result.rows[0].count

      return NextResponse.json({
        ...HTTP_CODE.CREATED,
        meg: '평가를 취소하였습니다.',
        likeCount,
        quoteId,
      })
    }

    await db.query(insertQuery, [userId, quoteId])
    const result = await db.query(likeCountSelectQuery, [quoteId])
    const likeCount = result.rows[0].count

    return NextResponse.json({
      ...HTTP_CODE.CREATED,
      meg: '평가를 반영 하였습니다.',
      likeCount,
      quoteId,
    })
  } catch (error) {
    console.error('POST /api/quotes/[id]/like', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
