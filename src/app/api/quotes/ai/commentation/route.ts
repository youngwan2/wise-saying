import { generateAiCommentation } from "@/ai";
import { HTTP_CODE } from "@/app/http-code";
import { openDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// 관리자 명언 쿼리
const quoteSelectQuery = `SELECT quote FROM quotes WHERE quote_id = $1`// 명언 조회
const commentationSelectQuery = `SELECT ai_commentation_id, commentation FROM ai_commentations WHERE quote_id = $1` // 해석 조회
const commentationInsertQuery = `INSERT INTO ai_commentations(commentation,quote_id) VALUES ($1,$2)` // 해석 추가

// 사용자 명언 쿼리
const userQuoteSelectQuery = `SELECT quote FROM user_quotes WHERE user_quote_id = $1` // 명언 조회
const userCommentationSelectQuery = `SELECT ai_commentation_id, commentation FROM user_ai_commentations WHERE user_quote_id = $1` // 해석 조회
const userCommentationInsertQuery = `INSERT INTO user_ai_commentations(commentation,user_quote_id) VALUES ($1,$2)` // 해석 추가

/** POST | 사용자가 요청한 명언의 해석을 생성 후 응답 */
export async function POST(req: NextRequest) {

    try {
        // 명언 내용, 아이디 받아오기
        const { quoteId, isUser } = await req.json()

        if (!quoteId) return NextResponse.json(HTTP_CODE.NOT_FOUND)

        const db = await openDB()

        // === 명언 테이블
        if (!isUser) {
            const quote = (await db.query(quoteSelectQuery, [quoteId])).rows[0].quote
            const result = await db.query(commentationSelectQuery, [quoteId])
            const dbCommentation = result.rows[0]
            const hasCommentation = Number(result.rowCount || 0) > 0

            // 명언 해석 존재하면, 기존 명언 해석 응답
            if (hasCommentation) {
                db.end()
                return NextResponse.json({ ...HTTP_CODE.CREATED, commentationInfo: dbCommentation || '' })

                // 없으면, 명언 해석 추가 후 응답
            } else {
                const commentation = await generateAiCommentation(quote)
                await db.query(commentationInsertQuery, [commentation, quoteId])
                const dbCommentation = (await db.query(commentationSelectQuery, [quoteId])).rows[0]
                db.end()

                return NextResponse.json({ ...HTTP_CODE.CREATED, commentationInfo: dbCommentation || '' })
            }

        // === 사용자 명언 테이블
        } else {
            const userQuote = (await db.query(userQuoteSelectQuery, [quoteId])).rows[0].quote
            const userResult = await db.query(userCommentationSelectQuery, [quoteId])
            const dbUserCommentation = userResult.rows[0]
            const hasUserCommentation = Number(userResult.rowCount || 0) > 0

            // 명언 해석 존재하면, 기존 명언 해석 응답
            if (hasUserCommentation) {
                db.end()
                return NextResponse.json({ ...HTTP_CODE.CREATED, commentationInfo: dbUserCommentation || '' })

                // 없으면, 명언 해석 추가 후 응답
            } else {
                const commentation = await generateAiCommentation(userQuote)
                await db.query(userCommentationInsertQuery, [commentation, quoteId])
                const dbCommentation = (await db.query(userCommentationSelectQuery, [quoteId])).rows[0]
                db.end()

                return NextResponse.json({ ...HTTP_CODE.CREATED, commentationInfo: dbCommentation || '' })
            }
        }
    } catch (error) {
        console.error('/api/quotes/ai/commentations/route.ts', error)
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
    }
}