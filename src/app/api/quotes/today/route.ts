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
        SELECT A.quote_id AS quote_id, quote, author, job, birth
        FROM quotes A INNER JOIN authors B ON A.author_id = B.author_id
        WHERE quote_id = $1
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
