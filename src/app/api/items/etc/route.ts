import { NextResponse } from 'next/server'
import { openDb } from '@/connect'

export async function GET() {
  try {
    const db = await openDb()
    const query = `
        SELECT category_id AS id, category FROM etc_group
    `
    const items = await db.all(query)
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버 측에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  }
}
