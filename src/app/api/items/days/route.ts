import { NextResponse } from 'next/server'
import { openDb } from '@/connect'

export async function GET() {
  let db = await openDb()
  try {
    const query = `
        SELECT category_id, category FROM days_group
    `
    const items = await db.all(query)
    console.log(items)
    return NextResponse.json(items)
  } catch (error) {
    console.error(error)
  }
}
