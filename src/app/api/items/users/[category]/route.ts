import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { openDb } from "@/connect";

// 조회
export async function GET(req: NextRequest, res: { params: { category: string } }) {
    const db = await openDb()

        const { category } = res.params
        const page = req.nextUrl.searchParams.get('page')
        const limit = req.nextUrl.searchParams.get('limit')

        const query = `
            SELECT id, wise_sayings, category, author, B.email AS email
            FROM quotes_user A JOIN users_group B
            ON A.user_id = B.user_id AND category = ?
            LIMIT ? OFFSET ?*15
        `
        const items = await db.all(query, [category, limit, page])
        return NextResponse.json(items)

}


// 수정
export async function PUT(req: NextRequest, res: { params: { id: string } }) {
    const postId = res.params.id
    const accessToken = req.headers.get("authorization")?.replace("Bearer ", "")!
    const scrept = process.env.JWT_SCREPT!
    const { wise_sayings, category, author } = await req.json()

    console.log(wise_sayings, category, author)

    const db = await openDb()

    try {
        const validToken = Jwt.verify(accessToken, scrept)

        if (!!validToken) {
            const query = `
            UPDATE quotes_user 
            SET wise_sayings = ?, category = ?, author = ?
            WHERE id = ?
        `

            db.all(query, [wise_sayings, category, author, postId])

            return NextResponse.json({ status: 201, success: true })
        }
    } catch (error) {
        return NextResponse.json({ status: 401, success: false, message: "유효 토큰이 만료되었습니다." })
    }
}
