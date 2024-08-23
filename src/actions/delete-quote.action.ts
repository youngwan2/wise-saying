"use server"

import { openDB } from "@/utils/connect"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { revalidatePath } from "next/cache"

const scrept = process.env.JWT_SCREPT || ''
const deleteQuery = ` DELETE FROM user_quotes WHERE user_quote_id = $1 `
export async function deleteUserQuoteAction(itemId: number, token: string) {

    const db = await openDB()

    try {
        const decode = (jwt.verify(token, scrept) as JwtPayload) || ''
        const user = decode.data

        if (!user) return { message: '로그인 후 시도해주세요.', success: false }

        await db.query(deleteQuery, [itemId])

        return { message: '삭제 성공 하였습니다.', success: true }

    } catch (error) {
        console.error(error)

        return { message: '삭제 실패 하였습니다.', success: false }
    } finally {
        db.end()
        revalidatePath('/user-quotes')
    }



}