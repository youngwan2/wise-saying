import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/utils/connect'

export async function GET(req: NextRequest) {
  try {
    const db = await openDB()
    const countSelectQuery = `
        SELECT COUNT(*) AS totalResult
        FROM quotes
  `

    const result = await db.query(countSelectQuery)

    const { totalresult: count } = result.rows[0] || { count: 0 }
    const randomNumbers: number[] = []

    while (randomNumbers.length < 3) {
      let randomNumber = Math.floor(Math.random() * count) + 1
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber)
      }
    }

    const query = `
        SELECT quote_id AS id, author, quote, job
        FROM quotes
        WHERE quote_id IN ($1,$2,$3)
    `
    const results = await db.query(query, randomNumbers)
    await db.end()
    const items = results.rows
    return NextResponse.json({
      meg: '성공적으로 처리되었습니다.',
      status: 200,
      success: true,
      items,
    })
  } catch (error) {
    console.error('/api/quotes/random/routs.ts', error)
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버 측에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  }
}
