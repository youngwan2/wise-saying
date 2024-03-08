import bcrpt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/utils/connect'
import { userSchema } from '@/validation/joi/schema'
import { HTTP_CODE } from '@/app/http-code'

// 암호화 설정(옵션)
const SALT = 10

export async function POST(req: NextRequest) {
  try {
    const db = await openDB()

    // 1. 유효성 조건식 작성
    const { '0': body } = await req.json()
    const { email, password, reConfirmPw } = body

    // 2. 유효성 검증
    const { error, value } = userSchema.validate({
      email,
      password,
      reConfirmPw,
    })


    // 3. 검증 실패 시 처리
    if (error) {
      return NextResponse.json({
        ...HTTP_CODE.BAD_REQUEST,
        meg: error.details,
      })
    }

    // 4. 검증 성공 시 비밀번호 해시 암호화
    const { email: validEmail, password: validPs } = value

    bcrpt.hash(validPs, SALT, async function (err, hash) {
      const query = `
      INSERT INTO users(email, password)
      VALUES ($1, $2)
   `
      db.query(query, [validEmail, hash])
      await db.end()
    })

    return NextResponse.json(HTTP_CODE.CREATED)

    // 그 외 서버 에러 처리
  } catch (error) {
    console.error('/api/auth/signin/route.ts')
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
