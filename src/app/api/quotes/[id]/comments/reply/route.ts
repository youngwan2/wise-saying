import { tokenVerify } from "@/utils/auth";
import { openDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET | 대댓글 조회
export async function GET(req: NextRequest) {

    const commentId = req.nextUrl.searchParams.get('comment-id')
    try {
        const db = await openDB();

        const selectQuery = `
            SELECT reply_id AS id, content,  nickname, email, A.created_at
            FROM replies A INNER JOIN users B 
            ON A.user_id = B.user_id
            WHERE comment_id = $1
        `

        const selectResult = await db.query(selectQuery, [commentId])
        const totalCount = selectResult.rowCount
        const replies = selectResult.rows

        return NextResponse.json({ meg: "성공적으로 등록처리 되었습니다.", status: 201, success: true, replies, totalCount })

    } catch (error) {
        console.error('GET /api/quotes/:id/comments/reply', error)
        return NextResponse.json({ meg: '서버 측에서 문제가 발생하였습니다. 나중에 다시시도 해주세요', status: 500, success: false })
    }
}

// POST | 대댓글 등록
export async function POST(req: NextRequest) {

    const { content } = await req.json() || { contente: '' };
    const commentId = req.nextUrl.searchParams.get('comment-id')
    const LENGTH_LESS_THAN_ONE = content.length < 1

    const { meg, status, success, user } = tokenVerify(req, true)

    if (status === 400) return NextResponse.json({ status, success, meg })
    if (status === 401) return NextResponse.json({ status, success, meg })

    if (!commentId && LENGTH_LESS_THAN_ONE) return NextResponse.json({ meg: '잘못된 요청입니다. 문자는 최소 1자 이상 입력하여야 합니다.', success: false, status: 400 })
    try {
        const db = await openDB()
        const { sub: userId } = user

        const selectQuery = `
            SELECT reply_id AS id, content,  nickname, email, A.created_at
            FROM replies A INNER JOIN users B 
            ON A.user_id = B.user_id
            WHERE comment_id = $1
        `
        const insertQuery = `
            INSERT INTO replies(comment_id, user_id, content)
            VALUES ($1, $2, $3)
        `
        await db.query(insertQuery, [commentId, userId, content])
        const selectResult = await db.query(selectQuery, [commentId])
        const totalCount = selectResult.rowCount
        const replies = selectResult.rows

        return NextResponse.json({ meg: "성공적으로 등록처리 되었습니다.", status: 201, success: true, replies, totalCount })

    } catch (error) {
        console.error('POST /api/quotes/:id/comments/reply', error)
        return NextResponse.json({ meg: '서버 측에서 문제가 발생하였습니다. 나중에 다시시도 해주세요', status: 500, success: false })
    }
}

// PATCH | 대댓글 수정
export async function PATCH(req: NextRequest) {

    const { content } = await req.json() || { content: '' }
    const commentId = req.nextUrl.searchParams.get('comment-id') || null
    const replyId = req.nextUrl.searchParams.get('reply-id') || null
    const { meg, status, success} = tokenVerify(req, true)
    const LENGTH_LESS_THAN_ONE = content.length < 1

    if (status === 400) return NextResponse.json({ status, success, meg })
    if (status === 401) return NextResponse.json({ status, success, meg })
    if (!commentId && !replyId && LENGTH_LESS_THAN_ONE) return NextResponse.json({ meg: '잘못된 요청입니다. 문자는 최소 1자 이상 입력하여야 합니다.', success: false, status: 400 })

    try {
        const db = await openDB()
        const updateQuery = `
        UPDATE replies(content)
        SET content = $1
        WHERE reply_id = $2
        `
        await db.query(updateQuery, [content, replyId])
        return NextResponse.json({ meg: "성공적으로 등록처리 되었습니다.", status: 200, success: true})
    
    } catch (error) {
        console.error('PATCH /api/quotes/:id/comments/reply', error)
        return NextResponse.json({ meg: '서버 측에서 문제가 발생하였습니다. 나중에 다시시도 해주세요', status: 500, success: false })

    }
}


// DELETE | 대댓글 삭제
export async function DELETE(req: NextRequest) {
    const commentId = req.nextUrl.searchParams.get('comment-id') || null
    const replyId = req.nextUrl.searchParams.get('reply-id') || null

    const { meg, status, success } = tokenVerify(req, true)

    if (status === 400) return NextResponse.json({ status, success, meg })
    if (status === 401) return NextResponse.json({ status, success, meg })

    if (!commentId && !replyId) return NextResponse.json({ meg: '잘못된 요청입니다.', success: false, status: 400 })
    try {
        const db = await openDB()
        const deleteQuery = `
        DELETE FROM replies
        WHERE reply_id = $1
        `

        await db.query(deleteQuery, [replyId])
        return NextResponse.json({ meg: "성공적으로 등록처리 되었습니다.", status: 200, success: true})

    } catch (error) {
        console.error('DELTE /api/quotes/:id/comments/reply', error)
        return NextResponse.json({ meg: '서버 측에서 문제가 발생하였습니다. 나중에 다시시도 해주세요', status: 500, success: false })

    }
}