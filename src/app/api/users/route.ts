import { openDB } from '@/utils/connect'
import { tokenVerify } from '@/utils/auth'
import { NextRequest, NextResponse } from 'next/server'
import bcrpt from 'bcrypt'
import joi from 'joi'
import { HTTP_CODE } from '@/app/http-code'



// PATCH | 비밀번호 변경
const SALT = 10
export async function PATCH(req: NextRequest) {
  const { password } = await req.json()

  // 유효성 검증
  const schema = joi.object({
    password: joi
      .string()
      .pattern(
        new RegExp(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$/,
        ),
      ),
  })

  const result = schema.validate({ password })
  const { password: validPs } = result.value

  if (result.error) {
    return NextResponse.json({
      ...HTTP_CODE.BAD_REQUEST,
      meg: '비밀번호 형식과 일치하지 않습니다.',
    }, { status: 400, statusText: "Invalid password" })
  }

  // 토큰 검증
  const { user, ...HTTP } = tokenVerify(req, true) as any
  if ([400].includes(HTTP.status)) return NextResponse.json(HTTP, { status: 400, statusText: "Bad Request" })
  if ([401].includes(HTTP.status)) return NextResponse.json(HTTP, { status: 401, statusText: "Unauthenticated" })

  const { sub: userId } = user

  // 비밀번호 해쉬 및 데이터베이스 저장
  const db = await openDB()
  try {
    const hash = await bcrpt.hash(validPs, SALT)
    const query = `UPDATE users SET password = $1 WHERE user_id = $2`
    
    await db.query(query, [hash, userId])
    

    return NextResponse.json(HTTP_CODE.OK)
  } catch (error) {
    console.error('/api/users/[id]/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  } finally {
    await db.end()
  }
}



// DELETE | 회원탈퇴
export async function DELETE(req: NextRequest) {
  const db = await openDB()

  try {
    // 토큰 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400].includes(HTTP.status)) return NextResponse.json(HTTP, { status: 400, statusText: "Bad Request" })
    if ([401].includes(HTTP.status)) return NextResponse.json(HTTP, { status: 401, statusText: "Unauthenticated" })

    const { email: dbEmail, sub: userId } = user
    const query = `DELETE FROM users WHERE email = $1 AND user_id = $2`

    await db.query(query, [dbEmail, userId])

    return NextResponse.json({
      ...HTTP_CODE.OK,
      meg: '회원탈퇴 처리가 완료 되었습니다. ',
    })
  } catch (error) {
    console.error('/api/users/[userId]', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  } finally {
    await db.end()
  }
}
