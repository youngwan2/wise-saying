import { generateQuoteBy } from '@/ai'
import { HTTP_CODE } from '@/app/http-code'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

const insertQuery = `
INSERT INTO ai_quotes (quote)
VALUES ($1)
`

export async function POST(req: NextRequest) {
  const { '0': content } = await req.json()
  try {
    if (content.length < 5)
      return NextResponse.json({
        ...HTTP_CODE.BAD_REQUEST,
        meg: '5자 이상 적어주세요.',
        result: '5자 이상 입력 바람.',
      })

    const db = await openDB()
    const aiQuote = await generateQuoteBy(content)

    db.query(insertQuery, [aiQuote])

    return NextResponse.json({
      ...HTTP_CODE.CREATED,
      result: aiQuote,
    })
  } catch (error) {
    console.error('/api/quotes/ai/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
