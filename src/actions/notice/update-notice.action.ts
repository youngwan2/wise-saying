"use server"

import { openDB } from "@/utils/connect"
import { revalidatePath } from "next/cache"

import jwt, { type JwtPayload } from "jsonwebtoken"
import { verifyAdmin } from "./vertify"

import { type OutputData } from "@editorjs/editorjs"


const secret = process.env.JWT_SCREPT || ''
export async function updateNoticeAction(categoryName: string, notice: OutputData | undefined, token: string, noticeId?:number) {
    if (!notice) return { message: '유효한 JSON 타입이 아닙니다.', success: false }
    if (!token) return { message: '접근 권한이 없습니다.', success: false }
    if(!noticeId) return { message: '게시글 ID 확인이 불가능하여 요청처리가 불가능합니다.',success:false}

    const decode = jwt.verify(token, secret) as JwtPayload

    if (!decode) return { message: '토큰이 만료되었습니다. 새로고침 및 재로그인 후 다시시도 해주세요.', success: false }

    const userId = decode?.data.sub || '-999'
    const db = await openDB();

    try {
        const isAdmin = await verifyAdmin(userId)
        if (!isAdmin) return { message: '관리자만 접근할 수 있습니다.', success: false }

        const categoryId = (await db.query(`SELECT notice_category_id  FROM notice_categories WHERE name = $1`, [categoryName])).rows[0].notice_category_id /* 카테고리 ID 조회 */
        await db.query(`UPDATE notices SET notice_category_id=$1, content=$2  WHERE notice_id = $3`, [categoryId, notice, noticeId]) /* 공지사항 저장 */

        return { message: '공지사항 수정 성공', success: true }
    } catch (error) {
        console.error(error);
        return { message: '공지사항 수정 실패', success: false }
    } finally {
        revalidatePath('/notice')
    }
}