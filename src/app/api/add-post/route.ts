import { NextRequest, NextResponse } from 'next/server'
import { openDb } from '@/connect'
import { accessTokenVerify } from '@/utils/validation'

export async function POST(req: NextRequest) {
  // 토큰 유효성 검증
  const user = accessTokenVerify(req)

  // 유효 토큰인지 검증 후 게시글 등록
  try {
    const db = await openDb()
    const { category, wise_sayings, author } = await req.json()

    console.log(category, wise_sayings,author)

    // 유효한 토큰이 아니면 자동으로 catch 에 에러를 전달
    const { dbEmail } = user

    // 유저 정보 검증
    const selectQuery = `
            SELECT user_id FROM users_group
            WHERE email = ?
        `
    const { user_id: userId } = await db.get(selectQuery, [dbEmail])
    const createDate = new Date().toLocaleString()



    const insertQuery = `
            INSERT INTO quotes_user(quote, user_id, category, author, create_date)
            VALUES (?,?,?,?,?)
        `

    db.all(insertQuery, [wise_sayings, userId, category, author, createDate])
    db.close()
    return NextResponse.json({
      status: 201,
      success: true,
      meg: '정상적으로 처리되었습니다.',
    })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      meg: '서버 측 문제 입니다. 나중에 다시 시도 해주세요.',
    })
  }
}
