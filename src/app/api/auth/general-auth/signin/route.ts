import bcrpt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { openDB } from '@/utils/connect'
import { consentSchema, userSchema } from '@/validation/joi/schema'
import { HTTP_CODE } from '@/app/http-code'

// 암호화 설정(옵션)
const SALT = 10

export async function POST(req: NextRequest) {
  try {
    const db = await openDB()

    // 1. 유효성 조건식 작성
    const { '0': body } = await req.json()
    const { email, password, reConfirmPw, consents } = body


    // 2. 유효성 검증
    const { error, value } = userSchema.validate({
      email,
      password,
      reConfirmPw,
    })

    const { error: vaiidConcentError, value: vaildConcents } = consentSchema.validate({
      ...consents
    })

    
    // 3. 검증 실패 시 처리
    if (error || vaiidConcentError) {
      return NextResponse.json({
        ...HTTP_CODE.BAD_REQUEST,
        meg: error?.details || vaiidConcentError?.details,
      })
    }

    // 4. 검증 성공 시 비밀번호 해시 암호화
    const { email: validEmail, password: validPs } = value
    const { all, term, private: privateConsent, child, event } = vaildConcents

    bcrpt.hash(validPs, SALT, async function (err, hash) {
      const userInsertQuery = `
      INSERT INTO users(email, password)
      VALUES ($1, $2)
   `
      const userSelectQuery = `
      SELECT user_id FROM users
      WHERE email = $1
      `

      const consentInsertQuery = `
      INSERT INTO consents(user_id, all_consent, terms_consent, private_consent, child_consent, event_consent)
      VALUES ($1, $2, $3, $4, $5, $6)
      `

      await db.query(userInsertQuery, [validEmail, hash])
      const result = await db.query(userSelectQuery, [email])
      const { user_id } = result.rows[0] || { user_id: null }
      if (user_id) await db.query(consentInsertQuery, [user_id, all, term, privateConsent, child, event])
      await db.end()
    })

    return NextResponse.json(HTTP_CODE.CREATED)

    // 그 외 서버 에러 처리
  } catch (error) {
    console.error('/api/auth/signin/route.ts')
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
