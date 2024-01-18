import { openDb } from "@/connect";
import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import { accessTokenVerify } from "@/utils/api/auth";


//  북마크 조회 처리
export async function GET(req: NextRequest) {

    const page = req.nextUrl.searchParams.get('page') || 0
    const limit = req.nextUrl.searchParams.get('limit') || 5

    try {
        const db = await openDb()
        const user = accessTokenVerify(req)
        const userId = user.userId

        const query = `
          SELECT bookmark_id AS id, author, category, wise_sayings, url
          FROM bookmarks
          WHERE user_id = ?
          ORDER BY id DESC
          LIMIT ? OFFSET ?*5
        `
        const countSelectQuery = `
          SELECT COUNT(*) AS count
          FROM bookmarks
          WHERE user_id = ?
        `
        try {
            const items = await db.all(query, [userId, limit, page])
            const countSelectResult = await db.get(countSelectQuery, [userId])
            const totalCount = countSelectResult.count

            return NextResponse.json({ meg: "성공적으로 북마크 목록을 가져왔습니다.", success: true, status: 200, items, totalCount })
        } catch (error) {
            console.log(error)
            return NextResponse.json({ meg: "조회된 북마크 목록이 존재하지 않습니다.", success: true, status: 200, items: [], totalCount: 0 })
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({ meg: '유효한 토큰이 아니거나 만료된 토큰 입니다. 다시 로그인을 시도해주세요.', success: false, status: 401 })
    }

}

// 북마크 추가 처리
export async function POST(req: NextRequest) {
    const { author, category, wise_sayings } = await req.json()

    const url = headers().get('referer')

    try {
        const db = await openDb()
        const user = accessTokenVerify(req)
        const userId = user.userId

        const selectQuery = `
        SELECT wise_sayings FROM bookmarks
        WHERE user_id = ? AND wise_sayings = ?   
        `
        const insertQuery = `
        INSERT INTO bookmarks(user_id, author, wise_sayings, category, url)
        VALUES (?, ?, ?, ?, ?)
        `
        // (북마크 목록에 이미 존재하는 경우) 북마크 목록에 추가하지 않기
        const isExistingItem = !!await db.get(selectQuery, [userId, wise_sayings])

        if (isExistingItem) { return NextResponse.json({ meg: "이미 존재하는 아이템 입니다.", success: false, status: 304 }) }

        // (북마크 목록에 없는 경우) 북마크 목록에 추가하기
        db.get(insertQuery, [userId, author, wise_sayings, category, url])

        return NextResponse.json({ meg: "북마크에 추가되었습니다.", success: true, status: 201 })

    } catch (error) {
        return NextResponse.json({ meg: '만료된 토큰 입니다. 다시 로그인을 시도해주세요.', success: false, status: 401 })
    }
}
