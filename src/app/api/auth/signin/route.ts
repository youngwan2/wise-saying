import joi from 'joi'
import bcrpt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'

// 암호화 설정(옵션)
const SALT = 10

export async function POST(req: NextRequest) {
  try {
    const db = await openDb()

    // 유효성 검사
    const { email, password, reConfirmPw } = await req.json()
    const schema = joi.object({
      email: joi
        .string()
        .email({ maxDomainSegments: 2, tlds: { allow: [`com`, `net`] } }),
      password: joi
        .string()
        .pattern(
          new RegExp(
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$/,
          ),
        ),
      reConfirmPw: joi.ref(`password`),
    })

    // 검증 결과
    const result = schema.validate({ email, password, reConfirmPw })

    // 검증 실패 처리
    if (result.error) {
      return NextResponse.json({
        meg: result.error.details,
        success: false,
        status: 401,
      })
    }
    const { email: validEmail, password: validPs } = result.value

    //검증 성공 시 비밀번호 해시 암호화
    bcrpt.hash(validPs, SALT, function (err, hash) {
      const query = `
      INSERT INTO users_group(email, password, create_date)
      VALUES (?,?,?)
  `
      const createDate = new Date().toLocaleString()
      db.all(query, [validEmail, hash, createDate])
    })

    return NextResponse.json({
      meg: '정상적으로 처리되었습니다.',
      status: 201,
      success: true,
    })

    // 그 외 서버 에러 처리
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
    })
  }
}
