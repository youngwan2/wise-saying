import { NextRequest, NextResponse } from "next/server";
import { openDb } from "@/connect";
import jwt, { JwtPayload } from 'jsonwebtoken'

export async function POST(req: NextRequest) {

    const db = await openDb();
    const { nickname, profile_image } = await req.json()
    const token = req.headers.get('authorization')

    if (!token) return NextResponse.json({ meg: '접근 권한이 없습니다.', success: false, status: 401 })

    const split = token.split(' ')
    const prefix = 'Bearer'
    const reqPrefix = split[0]
    const vaildToken = split[1]
    const scrept = process.env.JWT_SCREPT || ''

    if (prefix !== reqPrefix) return NextResponse.json({ meg: '접근 권한이 없습니다.', success: false, status: 401 })

    try {
        const user = jwt.verify(vaildToken, scrept) as JwtPayload
        const { dbEmail, userId } = user.data

        const query =
            `
            UPDATE users_group 
            SET nickname = ?, profile_image = ?
            WHERE email = ? AND user_id = ?
            `
        await db.all(query, [nickname, profile_image, dbEmail, userId])

        return NextResponse.json({ meg: '성공적으로 처리되었습니다.', status: 201, success: true })

    } catch (error) {
        return NextResponse.json({ meg: "요청이 실패하였습니다.", status: 500, success: false })
    }

}