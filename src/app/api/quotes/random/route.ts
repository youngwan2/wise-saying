import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'

export async function GET(req: NextRequest) {
  try {
    const db = await openDb()

    const countSelectQuery = `
        SELECT COUNT(*) AS totalResult
        FROM quotes_all
  `

    const result = (await db.get(countSelectQuery)) || { totalCount: 0 }
    const { totalResult: count } = result

    const randomNumbers:number[] = [] ||[1]
    
    while (randomNumbers.length < 3){
      let randomNumber = Math.floor(Math.random() * count) + 1
      if(!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber)
      }
    }

    const query = `
        SELECT quote_id AS id, author, quote, job
        FROM quotes_all
        WHERE id IN (?,?,?,?,?)
    `
    const items = await db.all(query, randomNumbers)

    return NextResponse.json(items)
  } catch (error) {
    console.error('/api/quotes/random/routs.ts',error)
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버 측에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  }
}
