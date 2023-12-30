import { NextResponse } from 'next/server'
import { openDb } from '@/connect'

export async function GET() {
  let db = await openDb()
  try {
    const query = `
        SELECT day_group_id, day_name FROM day_groups
    `
    const items = await db.all(query)
    return NextResponse.json(items)
  } catch (error) {
    console.error(error)
  }
}
