import { openDb } from "@/connect";
import { NextRequest, NextResponse } from "next/server";

// 단일 포스트 조회
export async function GET(req: NextRequest) {

    const postId = req.nextUrl.searchParams.get('postid')
    const db = await openDb()
    const query = `
    SELECT id, wise_sayings, category, author, B.email AS email
    FROM quotes_user A JOIN users_group B
    ON A.user_id = B.user_id 
    WHERE id = ?
    LIMIT 1
`
    console.log(postId)

    const item = await db.get(query, [postId])
    return NextResponse.json({meg:'성공적으로 처리되었습니다.', status: 200, item, success:true})
}