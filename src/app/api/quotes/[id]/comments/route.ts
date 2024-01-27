import { openDb } from "@/connect";
import { accessTokenVerify } from "@/utils/validation";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// POST | 댓글 등록
export async function POST(req: NextRequest, res: { params: { id: string } }) {
    const tag = req.nextUrl.searchParams.get('tag') || ''
    // 토큰 유효성 검증
    const { status, meg, success, user } = accessTokenVerify(req)
    if (status === 400) {
        return NextResponse.json({ status, success, meg })
    }

    if (status === 401) {
        return NextResponse.json({ status, success, meg })
    }

    const { comment } = await req.json() || ''

    // 댓글 유효성 검사
    if (comment.length < 2) return NextResponse.json({ status: 400, meg: '댓글 형식은 공백을 포함하여 2자 이상 입력해야 합니다.', success: false })

    try {
        const db = await openDb()
        const { userId } = user
        const quoteId = res.params.id
        const createDate = new Date().toLocaleString()

        const query = `
            INSERT INTO comments(comment, user_id, quote_id, create_date)
            VALUES (?,?,?,?)
            `
        db.get(query, [comment, userId, quoteId, createDate])
        revalidateTag(tag)
        db.close()
        return NextResponse.json({ status: 201, meg: '정상적으로 처리되었습니다.', success: true })

    } catch (error) {
        console.error('/api/quotes/[id]/comments/route.ts', error)
        return NextResponse.json({ status: 500, meg: '서버에서 문제가 발생하였습니다. 나중에 다사시도 해주세요.', success: false })
    }
}

// GET | 특정 포스트 댓글 조회
export async function GET(req: NextRequest, res: { params: { id: string } }) {
    const quoteId = res.params.id
    const tag = req.nextUrl.searchParams.get('tag') || ''

    try {
            const db = await openDb()
            const page = req.nextUrl.searchParams.get('page') || 0
            const userQuery = `
                SELECT B.comment_id AS id, A.email AS email, A.nickname AS nickname, A.profile_image AS profile_image, B.comment AS comment, B.create_date AS create_date
                FROM users_group A
                JOIN comments B ON A.user_id = B.user_id
                WHERE quote_id = ?
                LIMIT 5 OFFSET 5*?
            `
            const comments = await db.all(userQuery, [quoteId, page])
            revalidateTag(tag)
            return NextResponse.json({ status: 200, meg: '정상적으로 처리되었습니다.', success: true, items: comments })
    } catch (error) {
        console.error('/api/quotes/[id]/comments/route.ts', error)
        return NextResponse.json({ status: 500, meg: '서버에서 문제가 발생하였습니다. 나중에 다사시도 해주세요.', success: false })
    }
}

// PATCH | 특정 포스트 댓글 수정
export async function PATCH(req: NextRequest, res: { params: { id: string } }) {
    const quoteId = res.params.id

    const { status, meg, success, user } = accessTokenVerify(req)
    if (status === 400) {
        return NextResponse.json({ status, success, meg })
    }

    if (status === 401) {
        return NextResponse.json({ status, success, meg })
    }

    try {


    } catch (error) {

    }
}


// DELECT | 특정 포스트 댓글 삭제
export async function DELECT(req: NextRequest, res: { params: { id: string } }) {
    const quoteId = res.params.id
    const tag = req.nextUrl.searchParams.get('tag')

    // 토큰 유효성 검증
    const { status, meg, success, user } = accessTokenVerify(req)
    if (status === 400) {
        return NextResponse.json({ status, success, meg })
    }

    if (status === 401) {
        return NextResponse.json({ status, success, meg })
    }

    try {
        if (quoteId && tag) {
            const db = await openDb()
            const { userId } = user
            const userQuery = `
                WHERE quote_id = ? AND user_id = ?
            `
            await db.get(userQuery, [quoteId, userId])
            return NextResponse.json({ status: 203, meg: '정상적으로 삭제 처리되었습니다.', success: true })
        }
    } catch (error) {
        console.error('/api/quotes/[id]/comments/route.ts', error)
        return NextResponse.json({ status: 500, meg: '서버에서 문제가 발생하였습니다. 나중에 다사시도 해주세요.', success: false })
    }
}