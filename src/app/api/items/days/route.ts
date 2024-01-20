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
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버측에서 문재가 발생하였습니다. 나중에 다시시도해주세요.',
    })
  }
}
