import { generateQuoteBy } from '@/ai'
import { HTTP_CODE } from '@/app/http-code'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'


const selectQuery = `
  SELECT * FROM ai_quotes
`
export async function GET() {

  try {
    const db = await openDB()
    const result = await db.query(selectQuery)
    const quotes = result.rows
    return  NextResponse.json(quotes)

  } catch (error) {
    console.error('/api/quotes/ai/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }

}

const insertQuery = `
INSERT INTO ai_quotes (quote, category)
VALUES ($1, $2)
`

export async function POST(req: NextRequest) {
  const { '0': content } = await req.json()
  try {
    if (content.length < 5)
      return NextResponse.json({
        ...HTTP_CODE.BAD_REQUEST,
        result: `
        {
          'quote': '보다 명확한 생성을 위해 5자 이상 적어주세요.',
          'category': '',
        }
        `
      })

    const db = await openDB()
    const aiQuote = await generateQuoteBy(content) || "{'quote':'','category':''}"

    const parse = JSON.parse(aiQuote) as { quote: string, category: string }
    const { quote, category } = parse
    await db.query(insertQuery, [quote, category])

    db.end()

    return NextResponse.json({
      ...HTTP_CODE.CREATED,
      result: { ...parse, created_at: new Date().toLocaleString() },
    })
  } catch (error) {
    console.error('/api/quotes/ai/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
