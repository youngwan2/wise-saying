import { HTTP_CODE } from '@/app/http-code'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { '0': email } = await req.json()

  try {
    const db = await openDB()

    const query = `
        SELECT COUNT(*) as count
        FROM users
        WHERE email = $1
        `

    const result = await db.query(query, [email])
    const hasEmail = result.rows[0].count || 0

    if (hasEmail > 0) {
      return NextResponse.json({
        ...HTTP_CODE.OK,
        meg: '존재하는 이메일 입니다. 확인 후 로그인 해주세요.',
      })
    }

    if (hasEmail < 1) {
      return NextResponse.json({
        ...HTTP_CODE.NOT_FOUND,
        meg: '존재하지 않는 이메일 입니다.',
      })
    }
  } catch (error) {
    console.error('/api/auth/forgot/password')
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
