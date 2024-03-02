import { tokenVerify } from '@/utils/auth'
import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { userSchema } from '@/validation/joi/schema'

const SALT = 10
export async function POST(req: NextRequest) {
  const { pass, confirm } = await req.json()

  try {
    const db = await openDB()
    const { status, meg, success, user } = tokenVerify(req, true)

    if (status === 400) return NextResponse.json({ status, success, meg })
    if (status === 401) return NextResponse.json({ status, success, meg })

    const { email } = user

    // 유저 정보 유효성 검사
    const validUser = await userSchema.validateAsync({
      email,
      password: pass,
      reConfirmPw: confirm,
    })
    if (!validUser)
      return NextResponse.json({
        meg: '유효한 데이터 형식이 아닙니다. 다시 확인해주세요',
        status: 400,
        success: false,
      })

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
      meg: '비밀번호가 재설정 되었습니다.',
      status: 201,
      success: true,
    })
  } catch (error) {
    console.error('POST /api/auth/forgot/reset-pass', error)
    return NextResponse.json({
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      status: 500,
      success: false,
    })
  }
}
