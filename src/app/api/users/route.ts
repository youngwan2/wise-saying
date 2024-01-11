import { NextRequest, NextResponse } from "next/server";
import { openDb } from "@/connect";
import jwt, { JwtPayload } from 'jsonwebtoken'


// 회원가입 시 유저가 이미 존재하는지 검증
export async function POST(req: NextRequest) {
    try {
        const email = await req.json()
        const db = await openDb()

        const query = `
        SELECT * FROM users_group
        WHERE email = ?
    `
        const user = await db.get(query, [email])

        // 유저 정보가 있으면
        if (user) {
            return NextResponse.json({ meg: '이미 존재하는 이메일 입니다.', status: 409, success: false })
        }

        return NextResponse.json({ meg: "존재하지 않는 이메일 입니다.", status: 201, success: true })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ meg: "서버 문제가 발생하였습니다. 나중에 다시 시도해주세요.", status: 500, success: false })
    }
}


export async function GET(req: NextRequest) {

    try {
        const db = await openDb()
        const reqToken = req.headers.get('authorization')?.split(' ') || ''
        const scrept = process.env.JWT_SCREPT || ''
        const reqPrefix = reqToken[0]
        const prefix = 'Bearer'

        if (prefix !== reqPrefix) return NextResponse.json({ meg: "올바른 토큰 형식이 아닙니다.", status: 400, success: false })

        const token = reqToken[1]
        const result = jwt.verify(token, scrept) as JwtPayload
        const { userId } = result.data

        const query =
            `
        SELECT user_id, email, nickname, profile_image FROM users_group
        WHERE user_id = ?
        `
        const items = await db.get(query, [userId])

        return NextResponse.json({ meg: "정상처리되었습니다.", success: true, status: 200, items })
    } catch (error) {
        return NextResponse.json({ meg: "처리중입니다.", success: false, status: 500 })
    }

}   