"use server"

import { openDB } from "@/utils/connect"
import { revalidatePath } from "next/cache"

import jwt, { type JwtPayload } from "jsonwebtoken"
import { verifyAdmin } from "./vertify"

const secret = process.env.JWT_SCREPT || ''
export async function deleteNoticeAction(token: string, noticeId?: number) {
    if (!token) return { message: '접근 권한이 없습니다.', success: false }
    if (!noticeId) return { message: '게시글 ID 확인이 불가능하여 요청처리가 불가능합니다.', success: false }

    const decode = jwt.verify(token, secret) as JwtPayload

    if (!decode) return { message: '토큰이 만료되었습니다. 새로고침 및 재로그인 후 다시시도 해주세요.', success: false }

    const userId = decode?.data.sub || '-999'
    const db = await openDB();

    try {
        const isAdmin = await verifyAdmin(userId)
        if (!isAdmin) return { message: '관리자만 접근할 수 있습니다.', success: false }
        await db.query(`DELETE FROM notices WHERE notice_id = $1`, [noticeId])

        return { message: '공지사항 삭제 성공', success: true }
    } catch (error) {

        console.error(error);
        return { message: '공지사항 삭제 실패', success: false }
    } finally {
        revalidatePath('/notice')
    }
}