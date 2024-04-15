import { HTTP_CODE } from '@/app/http-code'
import { sendMailWithAwsSes, } from '@/mail'
import { openDB } from '@/utils/connect'
import { emailMxValidator, generateTempAccessToken } from '@/utils/forgot'
import { emailShema } from '@/validation/joi/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { '0': email } = await req.json()

  try {
    // 이메일 유효성 검증
    const { email: validEmail } = await emailShema.validateAsync({ email })
    if (!validEmail)
      return NextResponse.json({
        ...HTTP_CODE.BAD_REQUEST,
        meg: '유효한 이메일 형식이 아닙니다.',
      })

    const db = await openDB()
    const query = `
        SELECT COUNT(*) as count
        FROM users
        WHERE email LIKE $1
        `
    const result = await db.query(query, [validEmail])
    const mailCount = result.rows[0].count || 0

    // 존재하지 않는 이메일
    if (mailCount < 1)
      return NextResponse.json({
        ...HTTP_CODE.NOT_FOUND,
        meg: '존재하지 않는 이메일 입니다.',
      })

    // 도메인 유효성 검증
    const hasDomain = await emailMxValidator(validEmail)
    if (!hasDomain)
      return NextResponse.json({
        ...HTTP_CODE.NOT_FOUND,
        meg: '해당 이메일의 도메인이 존재하지 않습니다.',
      })

    // 임시 재발급 토큰 생성 및 이메일 전송
    if (mailCount > 0 && hasDomain) {
      const tempToken = await generateTempAccessToken(validEmail)

      await sendMailWithAwsSes(validEmail,"김씨",tempToken,'forgot' )

      // setMailOptions(validEmail, tempToken)
      // sendMail()

      return NextResponse.json({
        ...HTTP_CODE.CREATED,
        meg: '임시 토큰이 발급 처리 되었습니다. 추가 안내를 위해 이메일을 확인해주세요.',
      })
    }
  } catch (error) {
    console.error('/api/auth/forgot/password', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
