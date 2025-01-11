import { HTTP_CODE } from '@/app/http-code'
import { openDB } from '@/utils/connect'
import redisClient from '@/utils/redis'
import { emailMxValidator } from '@/utils/forgot'
import joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { sendMailWithAwsSes } from '@/mail'
import { getRandomAuthNum } from '@/utils/common-func'

// POST | 회원가입 시 유저가 이미 존재하는지 검증
const USER_MATCH_COUNT = 0

export async function POST(req: NextRequest) {
  try {
    const {email} = await req.json()

    // 이메일 유효성 검사
    const schema = joi.object({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    })

    const vaild = schema.validate({ email })
    if (vaild.error) {
      return NextResponse.json({
        ...HTTP_CODE.BAD_REQUEST,
        meg: '잘못된 형식의 이메일 입니다. .com과 .net 형식만 허용합니다. ',
      },{status:400, statusText:"Invalid"})
    }

    // 도메인 유효성 검사(MX 레코드 )
    const isValid = await emailMxValidator(email)

    if (!isValid) return NextResponse.json({ ...HTTP_CODE.NOT_FOUND, meg: "존재하지 않는 도메인입니다. 유효한 도메인 형식으로 다시 요청해주세요." }, {status:404, statusText:"Not found"})


    // 유효한 이메일 형식이라면 유저정보 찾기
    const db = await openDB()
    const query = `
          SELECT * FROM users
          WHERE email IN ($1)
      `
    const results = await db.query(query, [email])
    const queriedUserCount = results.rowCount || 0
    db.end()

    // 이미 존재하는 이메일 인 경우
    if (queriedUserCount > USER_MATCH_COUNT) {
      return NextResponse.json({
        ...HTTP_CODE.CONFLICT,
        meg: '이미 존재하는 이메일 입니다.',
      }, {status:409, statusText:"Conflict"})
    }


    // 레디스에 인증번호를 저장한다.(1000 ~ 9999) 
    const emailAuthNum = getRandomAuthNum()
    const userInfo = { authNum: emailAuthNum, email: email }

    // 이메일 주소로 인증번호 발송
    sendMailWithAwsSes(email, "가입자", String(emailAuthNum), 'signin')

    // redis 연결 및 데이터 저장
    if(await redisClient.incr(userInfo.email)>3){
      await redisClient.del(userInfo.email);
      return NextResponse.json({
       ...HTTP_CODE.BAD_REQUEST,
        meg: '5분 내에 3번만 요청할 수 있습니다.',
      })
    }
    await redisClient.set(userInfo.email, userInfo.authNum)
    await redisClient.expire(userInfo.email, 420); // 7분 후 키 삭제

    return NextResponse.json({
      ...HTTP_CODE.NO_CONTENT,
      meg: '존재하지 않는 이메일 입니다.',
    })
  } catch (error) {
    console.error('/api/users/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}


