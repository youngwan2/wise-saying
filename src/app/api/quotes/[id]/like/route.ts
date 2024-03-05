import { oauth2UserInfoExtractor, tokenVerify } from '@/utils/auth'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

// GET | 좋아요 조회
export async function GET(req:NextRequest, res: { params: { id: string } }) {
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


const checkSelectQuery = `
SELECT COUNT(*) as count
FROM quote_likes A JOIN users B
ON A.user_id = B.user_id
WHERE B.email = $1 AND quote_id = $2
`
const deleteQuery = `DELETE FROM quote_likes WHERE user_id = $1 AND quote_id = $2`
const insertQuery = `INSERT INTO quote_likes(user_id, quote_id) VALUES ($1, $2)`
const likeCountSelectQuery = `SELECT COUNT(*) as count FROM quote_likes  WHERE quote_id = $1 `

// POST | 좋아요 증가
export async function POST(req: NextRequest, res: { params: { id: string } }) {
  try {
    const db = await openDB()
    const quoteId = res.params.id


    // 소셜 로그인
    const { email: socialEmail, userId: socialUserId } = await oauth2UserInfoExtractor() || { email: '', userId: '' }

    if (socialUserId) {
      const checkResult = await db.query(checkSelectQuery, [socialEmail, quoteId])
      const isLiked = checkResult.rows[0].count

      if (Number(isLiked) > 0) {
        await db.query(deleteQuery, [socialUserId, quoteId])
        const result = await db.query(likeCountSelectQuery, [quoteId])
        const likeCount = result.rows[0].count
        db.end()

        return NextResponse.json({
          meg: '정상 처리 되었습니다.',
          status: 201,
          success: true,
          likeCount,
          quoteId,
        })
      }

      if (Number(isLiked) < 1) {
        await db.query(insertQuery, [socialUserId, quoteId])

        const result = await db.query(likeCountSelectQuery, [quoteId])
        const likeCount = result.rows[0].count
        db.end()
        return NextResponse.json({
          meg: '정상 처리 되었습니다..',
          status: 201,
          success: true,
          likeCount,
          quoteId,
        })
      }
    }

    // 일반 로그인
    const { meg, status, success, user } = tokenVerify(req, true)

    if (status === 400) {
      return NextResponse.json({ status, success, meg })
    }
    if (status === 401) {
      return NextResponse.json({ status, success, meg })
    }

    const { sub: userId, email: jwtEmail } = user

    const checkResult = await db.query(checkSelectQuery, [jwtEmail, quoteId])
    const isLiked = checkResult.rows[0].count

    if (Number(isLiked) > 0) {
      await db.query(deleteQuery, [userId, quoteId])
      const result = await db.query(likeCountSelectQuery, [quoteId])
      const likeCount = result.rows[0].count

      return NextResponse.json({
        meg: '평가를 취소합니다..',
        status: 201,
        success: true,
        likeCount,
        quoteId,
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
