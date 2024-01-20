import { NextRequest, NextResponse } from 'next/server'
import Jwt from 'jsonwebtoken'
import { openDb } from '@/connect'

export async function DELETE(
  req: NextRequest,
  res: { params: { id: string } },
) {
  const scrept = process.env.JWT_SCREPT!
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')!
  const { id } = res.params

  const db = await openDb()

  try {
    const result = Jwt.verify(token, scrept)
    const isValid = !!result
    if (isValid) {
      const query = `
            DELETE FROM quotes_user
            WHERE id = ?
        `
      db.all(query, [id])
      return NextResponse.json({ status: 201, success: true })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 401,
      success: false,
      message: '유효한 토큰이 아닙니다.',
    })
  }
}
