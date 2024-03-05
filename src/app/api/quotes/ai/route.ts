import { generateQuoteBy } from "@/ai";
import { openDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

const insertQuery = `
INSERT INTO ai_quotes (quote)
VALUES ($1)
`

export async function POST(req: NextRequest) {
    const { '0': content } = await req.json()
    try {
        if (content.length < 5) return NextResponse.json({ meg: "5자 이상 적어주세요.", success: false, status: 401, result: '5자 이상 입력 바람.' })
        const db = await openDB()

        const aiQuote = await generateQuoteBy(content)
        db.query(insertQuery, [aiQuote])

        return NextResponse.json({ meg: "성공적으로 처리되었습니다.", success: true, status: 200, result: aiQuote })
    } catch (error) {
        console.error('/api/quotes/ai/route.ts', error)
        return NextResponse.json({ meg: "서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요", success: false, status: 500, result: '서버에서 문제가 발생하여 명언을 생성할 수 없습니다.' })

    }

}