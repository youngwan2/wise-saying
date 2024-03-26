export const dynamic = 'force-dynamic' 

import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/utils/connect'
import { HTTP_CODE } from '@/app/http-code'


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

    while (randomNumbers.length < 1) {
      let randomNumber = Math.floor(Math.random() * count) + 1
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber)
      }
    }

    const query = `
        SELECT quote_id AS id, author, quote, job
        FROM quotes
        WHERE quote_id IN ($1)
    `
    const results = await db.query(query, randomNumbers)
    await db.end()

    const items = results.rows
    return NextResponse.json({
      ...HTTP_CODE.OK,
      items,
    })
  } catch (error) {
    console.error('/api/quotes/random/routs.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
