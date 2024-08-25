"use server"

import { openDB } from "@/utils/connect"
import { OutputData } from "@editorjs/editorjs"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { revalidatePath } from "next/cache"
import { verifyAdmin } from "./vertify"

const secret = process.env.JWT_SCREPT || ''

/** 공지시항 추가 */
export async function addNoticeAction(categoryName: string, notice: OutputData | undefined, token: string) {
    if (!notice) return { message: '유효한 JSON 타입이 아닙니다.', success: false }
    if (!token) return { message: '접근 권한이 없습니다.', success: false }

    const decode = jwt.verify(token, secret) as JwtPayload

    if (!decode) return { message: '토큰이 만료되었습니다. 새로고침 및 재로그인 후 다시시도 해주세요.', success: false }

    const userId = decode?.data.sub || '-999'
    const db = await openDB();

    try {
        const isAdmin = await verifyAdmin(userId)

        if (!isAdmin) return { message: '관리자만 접근할 수 있습니다.', success: false }

        const categoryId = (await db.query(`SELECT notice_category_id  FROM notice_categories WHERE name = $1`, [categoryName])).rows[0].notice_category_id /* 카테고리 ID 조회 */

        await db.query(`INSERT INTO notices(content, user_id, notice_category_id) VALUES($1,$2,$3)`, [notice,  userId, categoryId]) /* 공지사항 저장 */

        return { message: '공지사항 추가 성공', success: true }
    } catch (error) {
        console.error(error);
        return { message: '공지사항 추가 실패', success: false }
    } finally {
        revalidatePath('/notice')
    }
}

