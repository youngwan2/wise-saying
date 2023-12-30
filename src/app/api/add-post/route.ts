import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { openDb } from "@/connect";

export async function POST(req: NextRequest) {

    const db = await openDb()
    const scrept = process.env.JWT_SCREPT!
    const token = req.headers.get('authorization')?.replace('Bearer ', '')!

    // 토큰 자체가 존재하지 않는 경우
    if (!token) {
        return NextResponse.json({ status: 401, success: false, message: "유효한 토큰이 존재하지 않습니다." })
    }

    // 유효 토큰인지 검증 후 게시글 등록
    try {
        const { category, wise_sayings, author, userEmail } = await req.json()
        const validToken = jwt.verify(token, scrept)
        
        const selectQuery = `
        SELECT user_id FROM users_group
        WHERE email = ?
    `
        // 유저가 존재 한다면 포스트 추가
        const { user_id: userId } = await db.get(selectQuery, [userEmail])
        const isUser = !!userId

        if (isUser) {
            const insertQuery = `
            INSERT INTO quotes_users(wise_sayings, user_id,category, author)
            VALUES (?,?,?,?)
        `
            try {
                console.log(db.all(insertQuery, [wise_sayings, userId, category, author]))

            } catch (error) {
                console.error(error)
            }
        }
        return NextResponse.json({ status: 201, success: true })

    } catch (error) {
        return NextResponse.json({ status: 401, success: false, message: "토큰이 만료되었습니다. 다시 로그인 해주세요." })
    }


}
