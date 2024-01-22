import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'
import { accessTokenVerify } from '@/utils/validation'

export async function POST(req: NextRequest) {
  try {
    const db = await openDb()
    const { nickname, profile_image } = await req.json()

    const user = accessTokenVerify(req)
    const { dbEmail, userId } = user

    const query = `
            UPDATE users_group 
            SET nickname = ?, profile_image = ?
            WHERE email = ? AND user_id = ?
            `
    await db.all(query, [nickname, profile_image, dbEmail, userId])

    return NextResponse.json({
      meg: '성공적으로 처리되었습니다.',
      status: 201,
      success: true,
    })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  }
}
