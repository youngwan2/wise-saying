import { openDB } from '@/utils/connect'
import { tokenVerify } from '@/utils/auth'
import { NextRequest, NextResponse } from 'next/server'
import bcrpt from 'bcrypt'
import joi from 'joi'

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
      meg: '비밀번호 형식과 일치하지 않습니다.',
      success: false,
      status: 400,
    })
  }

  // 토큰 검증
  const { meg, success, status, user } = tokenVerify(req, true)
  const { sub: userId } = user

  if (status === 400) return NextResponse.json({ status, success, meg })
  if (status === 401) return NextResponse.json({ status, success, meg })

  // 비밀번호 해쉬 및 데이터베이스 저장
  try {
    const db = await openDB()

    bcrpt.hash(validPs, SALT, async function (err, hash) {
      const query = `
            UPDATE users
            SET password = $1
            WHERE user_id = $2
        `
      await db.query(query, [hash, userId])
      await db.end()
    })

    return NextResponse.json({
      meg: '정상적으로 처리되었습니다.',
      status: 201,
      success: true,
    })
  } catch (error) {
    console.error('/api/users/[id]/route.ts')
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  }
}

// DELETE | 회원탈퇴
export async function DELETE(req: NextRequest) {
  try {
    // 토큰 검증
    const { meg, success, status, user } = tokenVerify(req, true)

    if (status === 400) return NextResponse.json({ status, success, meg })
    if (status === 401) return NextResponse.json({ status, success, meg })

    const { email: dbEmail, sub: userId } = user
    const db = await openDB()
    const query = `
    DELETE FROM users
    WHERE email = $1 AND user_id = $2
    `

    await db.query(query, [dbEmail, userId])
    await db.end()
    return NextResponse.json({
      meg: '회원탈퇴 처리가 완료 되었습니다. 그 동안 이용해 주셔서 감사합니다. 회원 관련 서비스 이외에는 정상 이용 가능하니 생각나실 때 한 번씩 이용 해주세요.',
      success: true,
      status: 204,
    })
  } catch (error) {
    console.error('/api/users/[userId]', error)
    return NextResponse.json({
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요',
      status: 500,
      success: false,
    })
  }
}
