import { auth } from '@/configs/config.auth'
import { openDB } from '@/utils/connect'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  const email = session?.user?.email
  const image = session?.user?.image

  const nickname = session?.user?.name
  const db = await openDB()

  // 이미 존재하는 유저인가?
  const selectQuery = `
    SELECT * FROM users
    WHERE email = $1
    `

  const results = await db.query(selectQuery, [email])
  const hasUser = (results?.rowCount || 0) > 0
  const date = new Date().toLocaleString()
  if (hasUser) {
    return NextResponse.json({meg:`${nickname}님! 반갑습니다(접속일시:${date}) `, success:false })
  }

  // 새로운 유저
  const insertQuery = `
    INSERT INTO users(email, profile_img_url, nickname, provider)
    VALUES ($1, $2, $3, $4)
    `

  db.query(insertQuery, [email, image, nickname, 'social'])

  return NextResponse.json({ meg:`${nickname}님! 반갑습니다(접속일시:${date}) `, success:true })
}
