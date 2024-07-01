import { generateAiCommentation } from "@/ai";
import { HTTP_CODE } from "@/app/http-code";
import { openDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


const quoteSelectQuery = `SELECT quote FROM quotes WHERE quote_id = $1`
const commentationSelectQuery = `SELECT ai_commentation_id, commentation FROM ai_commentations WHERE quote_id = $1`
const commentationInsertQuery = `INSERT INTO ai_commentations(commentation,quote_id) VALUES ($1,$2)`

/** POST | 사용자가 요청한 명언의 해석을 생성 후 응답 */
export async function POST(req: NextRequest) {

    try {
        // 명언 내용, 아이디 받아오기
        const  quoteId  = await req.json()
        if (!quoteId) return NextResponse.json(HTTP_CODE.NOT_FOUND)

        const db = await openDB()

        // 명언 테이블 조회
        const quote = (await db.query(quoteSelectQuery,[quoteId] )).rows[0].quote

        // AI 명언 해석 테이블 조회
        const result  = await db.query(commentationSelectQuery, [quoteId])
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

    } catch (error) {
        console.error('/api/quotes/ai/commentations/route.ts', error)
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
    }
}