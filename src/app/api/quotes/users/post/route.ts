import { openDB } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'
import {  tokenVerify } from '@/utils/auth'
import { HTTP_CODE } from '@/app/http-code'
import { aiProfanityFilter } from '@/ai'


const insertQuery = `
INSERT INTO user_quotes(quote, category,author, user_id)
VALUES ($1,$2,$3,$4)
`



// POST | 유저가 작성한 포스트 등록(추가) 요청
export async function POST(req: NextRequest) {
  const db = await openDB()
  const { '0': body } = await req.json()
  const { category, content: quote, author } = body

  const filterJson = await aiProfanityFilter([category, quote, author]) || '{"judgment": false, "reason": "" }'
  const { judgment, reason } = JSON.parse(filterJson)

  if (judgment) {
    return NextResponse.json({ ...HTTP_CODE.BAD_REQUEST, meg: reason })
  }


  try {
    const { user, ...HTTP } = tokenVerify(req, true) as any
    if ([400, 401].includes(HTTP.status)) return NextResponse.json(HTTP)

    const { sub: userId } = user

    await db.query(insertQuery, [
      quote,
      category.trim(),
      author,
      userId
    ])

    await db.end()
    return NextResponse.json({ ...HTTP_CODE.NO_CONTENT, meg: '정상적으로 등록되었습니다.' })
  } catch (error) {
    console.error('/api/quotes/users/post/route.ts', error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
  }
}
