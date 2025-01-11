import { tokenVerify } from "@/utils/auth"
import { openDB } from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"
import { HTTP_CODE } from '@/app/http-code'

// GET | 유저 프로필 정보 요청
export async function GET(req: NextRequest) {
    const db = await openDB()

    try {
        const { user, ...HTTP } = tokenVerify(req, true) as any
        if ([400].includes(HTTP.status)) return NextResponse.json(HTTP, { status: 400, statusText: "Bad Request" })
        if ([401].includes(HTTP.status)) return NextResponse.json(HTTP, { status: 401, statusText: "Unauthenticated" })

        // 검증 후 처리

        const { sub: userId } = user

        const query = `
            SELECT user_id, email, nickname, profile_img_url AS profile_image FROM users
            WHERE user_id = $1
            `

        const results = await db.query(query, [userId])
        const userInfo = results.rows[0]


        return NextResponse.json({
            ...HTTP_CODE.OK,
            userInfo,
        })
    } catch (error) {
        console.error('/api/users/route.ts', error)
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
    } finally {
        await db.end()
    }
}




// PATCH | 유저 프로필 정보 업데이트
export async function PATCH(req: NextRequest) {

    const db = await openDB()

    try {
        const { nickname, profile_image } = await req.json()

        // 토큰 유효성 검증
        const { user, ...HTTP } = tokenVerify(req, true) as any
        if ([400].includes(HTTP.status)) return NextResponse.json(HTTP, { status: 400, statusText: "Bad Request" })
        if ([401].includes(HTTP.status)) return NextResponse.json(HTTP, { status: 401, statusText: "Unauthenticated" })


        // 검증 통과 후 유저 프로필 업로드 처리
        const { email: dbEmail, sub: userId } = user
        const query = `
            UPDATE users
            SET nickname = $1, profile_img_url = $2, updated_at = CURRENT_TIMESTAMP
            WHERE email = $3 AND user_id = $4
`

        await db.query(query, [nickname, profile_image, dbEmail, userId])
        db.end()

        return NextResponse.json(HTTP_CODE.NO_CONTENT)
    } catch (error) {
        console.error('/api/users/upload/route.ts', error)
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
    } finally {
        db.end();
    }
}
