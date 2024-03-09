import { openDB } from '@/utils/connect'
import { oauth2UserInfoExtractor, tokenVerify } from '@/utils/auth'
import { NextRequest, NextResponse } from 'next/server'
import bcrpt from 'bcrypt'
import joi from 'joi'
import { HTTP_CODE } from '@/app/http-code'

// PATCH | 비밀번호 변경
const SALT = 10
export async function PATCH(req: NextRequest) {
  const { '0': password } = (await req.json()) || ''

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
    })
  }

  // 토큰 검증
  const { user, ...HTTP } = tokenVerify(req, true) as any
  if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

  const { sub: userId } = user

  // 비밀번호 해쉬 및 데이터베이스 저장
  try {
    const db = await openDB()

    bcrpt.hash(validPs, SALT, async function (_, hash) {
      const query = `
            UPDATE users
            SET password = $1
            WHERE user_id = $2
        `
      await db.query(query, [hash, userId])
      await db.end()
    })

    return NextResponse.json(HTTP_CODE.NO_CONTENT)
  } catch (error) {
    console.error('/api/users/[id]/route.ts')
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}

const query = `
DELETE FROM users
WHERE email = $1 AND user_id = $2
`

// DELETE | 회원탈퇴
export async function DELETE(req: NextRequest) {
  try {
    const db = await openDB()

    const { email: socialEmail, userId: socialUserId } =
      (await oauth2UserInfoExtractor()) || { email: '', userId: '' }

    // 소셜 로그인
    if (socialUserId) {
      await db.query(query, [socialEmail, socialUserId])
      await db.end()
      return NextResponse.json({
        ...HTTP_CODE.NO_CONTENT,
        meg: '회원탈퇴 처리가 완료 되었습니다. 그 동안 이용해 주셔서 감사합니다. 회원 관련 서비스 이외에는 정상 이용 가능하니 생각나실 때 한 번씩 이용 해주세요.',
      })
    }

    // 토큰 검증
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    const { email: dbEmail, sub: userId } = user

    await db.query(query, [dbEmail, userId])
    await db.end()
    return NextResponse.json({
      ...HTTP_CODE.NO_CONTENT,
      meg: '회원탈퇴 처리가 완료 되었습니다. 그 동안 이용해 주셔서 감사합니다. 회원 관련 서비스 이외에는 정상 이용 가능하니 생각나실 때 한 번씩 이용 해주세요.',
    })
  } catch (error) {
    console.error('/api/users/[userId]', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
