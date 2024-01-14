import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { openDb } from "@/connect";

export async function POST(req: NextRequest) {

    const db = await openDb()
    const scrept = process.env.JWT_SCREPT!
    const token = req.headers.get('authorization')?.split(' ') || ''
    const prefix = 'Bearer'
    const validToken = token[1]

    console.log(token)

    // 토큰 전송 형식과 일치하지 않는 경우
    if (prefix !== token[0]) {
        return NextResponse.json({ status: 400, success: false, meg: "올바른 형식의 토큰이 아닙니다. 다시 확인해주세요" })
    }
    // 토큰 자체가 존재하지 않는 경우
    if (!token) {
        return NextResponse.json({ status: 401, success: false, meg: "유효한 토큰이 존재하지 않습니다." })
    }

    // 유효 토큰인지 검증 후 게시글 등록
    try {
        const { category, wise_sayings, author} = await req.json()

        // 유효한 토큰이 아니면 자동으로 catch 에 에러를 전달
        const decode = jwt.verify(validToken, scrept) as JwtPayload
        const {dbEmail, userId} = decode.data
        
        // 유저 정보 검증
        const selectQuery = `
        SELECT user_id FROM users_group
        WHERE email = ?
        `
        const { user_id } = await db.get(selectQuery, [dbEmail])
        const isUser = !!user_id

        // 유저 정보가 없는 경우
        if (!isUser) {
            return NextResponse.json({ status: 403, success: false, meg: "접근 권한이 없습니다. 다시 로그인 해주세요." })
        }

        const insertQuery = `
            INSERT INTO quotes_user(wise_sayings, user_id,category, author)
            VALUES (?,?,?,?)
            `
        try {
            db.all(insertQuery, [wise_sayings, userId, category, author])

        } catch (error) {
            return NextResponse.json({ status: 500, success: false, meg: "서버 측 문제 입니다. 나중에 다시 시도 해주세요." })
        }

        return NextResponse.json({ status: 201, success: true, meg: "정상적으로 처리되었습니다." })

    } catch (error) {
        return NextResponse.json({ status: 403, success: false, meg: "접근 권한이 없습니다. 다시 로그인 해주세요." })
    }


}
