import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'

interface ItemsType {
  items: {
    id: number
    author: string
  }[]
}

export async function GET(req: NextRequest) {
  try {
    const db = await openDb()
    const query = `
        SELECT category_id AS id, category AS author FROM authors_group 
    `
    const items: ItemsType = await db.all(query)
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버측에서 문재가 발생하였습니다. 나중에 다시시도해주세요.',
    })
  }
}
