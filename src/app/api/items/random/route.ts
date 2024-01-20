import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'

export async function GET(req: NextRequest) {
  const db = await openDb()

  const countSelectQuery = `
        SELECT COUNT(*) AS totalResult
        FROM quotes_all
  `

  const result = (await db.get(countSelectQuery)) || { totalCount: 0 }
  const { totalResult: count } = result

  const randomResult = (Math.random() * count).toFixed(0)
  const randomResult2 = (Math.random() * count).toFixed(0)
  const randomResult3 = (Math.random() * count).toFixed(0)
  const randomResult4 = (Math.random() * count).toFixed(0)
  const randomResult5 = (Math.random() * count).toFixed(0)

  const query = `
        SELECT DISTINCT id, author, wise_sayings 
        FROM quotes_all
        WHERE id IN (?,?,?,?,?)
    `
  const items = await db.all(query, [
    randomResult,
    randomResult2,
    randomResult3,
    randomResult4,
    randomResult5,
  ])

  return NextResponse.json(items)
}
