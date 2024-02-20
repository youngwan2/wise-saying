import { sendMail, setMailOptions } from '@/mail'
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
        meg: '유효한 이메일 형식이 아닙니다.',
        success: false,
        status: 400,
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
        meg: '존재하지 않는 이메일 입니다.',
        success: false,
        status: 404,
      })

    // 도메인 유효성 검증
    const hasDomain = await emailMxValidator(validEmail)
    if (!hasDomain)
      return NextResponse.json({
        meg: '해당 이메일의 도메인이 존재하지 않습니다.',
        success: false,
        status: 404,
      })

    // 임시 재발급 토큰 생성 및 이메일 전송
    if (mailCount > 0 && hasDomain) {
      const tempToken = await generateTempAccessToken(validEmail)

      setMailOptions(validEmail, tempToken)
      sendMail()

      return NextResponse.json({
        meg: '임시 토큰이 발급 처리 되었습니다. 추가 안내를 위해 이메일을 확인해주세요.',
        success: true,
        status: 201,
      })
    }
  } catch (error) {
    console.error('/api/auth/forgot/password', error)
    return NextResponse.json({
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
      success: false,
      status: 500,
    })
  }
}
