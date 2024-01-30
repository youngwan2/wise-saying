import { openDb } from "@/connect"
import { NextResponse } from "next/server"

// GET | 유저가 작성한 명언 카드의 카테고리를 중복제거 가져온다.
export async function GET() {
    try {
        const db = await openDb()

        const joinQuery = `
        SELECT DISTINCT sub_category AS category
        FROM quotes_all A
        JOIN users_group B
        ON A.user_id = B.user_id
      `
        try {
            const results = await db.all(joinQuery)
            const items = results.map((categories, i) => {
                return { category: categories.category, category_id: i }
            }) || [{ category: '', category_id: 0 }]
            db.close()
            return NextResponse.json({
                items,
                status: 200,
                meg: '정상적으로 요청처리 되었습니다.',
                success: true,
            })
        } catch (error) {
            return NextResponse.json({
                items: [{ category: '', category_id: 0 }],
                status: 404,
                meg: '데이터가 존재하지 않습니다.',
                success: false,
            })
        }
    } catch (error) {
        console.log('/api/quotes/user/post/categories/route.ts:', error)
        return NextResponse.json({
            status: 500,
            meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.',
            success: false,
        })
    }
}
