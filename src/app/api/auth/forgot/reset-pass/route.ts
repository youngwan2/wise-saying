import { tokenVerify } from '@/utils/auth'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { userSchema } from '@/validation/joi/schema'
import { HTTP_CODE } from '@/app/http-code'


const SALT = 10
export async function POST(req: NextRequest) {
  const { pass, confirm } = await req.json()

  try {
    const db = await openDB()
    const { user, ...HTTP } = tokenVerify(req, true) as any

    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    const { email } = user

    // 유저 정보 유효성 검사
    const validUser = await userSchema.validateAsync({
      email,
      password: pass,
      reConfirmPw: confirm,
    })
    if (!validUser)
      return NextResponse.json(HTTP_CODE.BAD_REQUEST)

    // 새 비밀번호 암호화
    const { password } = validUser
    const bcryptPass = await bcrypt.hash(password, SALT)

    // 데이터베이스 저장
    const query = `
        UPDATE users
        SET password = $1
        WHERE email = $2
        `
    db.query(query, [bcryptPass, email])
    db.end()

    return NextResponse.json({
      ...HTTP_CODE.CREATED,
      meg: '비밀번호가 재설정 되었습니다.',
    })
  } catch (error) {
    console.error('POST /api/auth/forgot/reset-pass', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
