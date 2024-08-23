"use server"

import jwt, { JwtPayload } from "jsonwebtoken"
import { openDB } from "@/utils/connect"
import { revalidatePath } from "next/cache"


const insertQuery = `
INSERT INTO user_quotes(quote, category,author, user_id)
VALUES ($1,$2,$3,$4)
`
// 포스트 요청
export const postQuoteAction = async (prevState: { message: string }, form: FormData) => {
    const category = form.get('category')?.valueOf().toString() || ''
    const content = form.get('content')?.valueOf().toString() || ''
    const author = form.get('author')?.valueOf().toString() || ''
    const token = form.get('token')?.valueOf().toString() || ''
    const scrept = process.env.JWT_SCREPT || ''

    // 유효성 검증
    if (!token) return { message: '유효한 접근 권한이 없습니다. 로그인 후 시도해주세요.' }
    if (!(category && content && author))
        return { message: '모든 빈칸을 채워주세요.', success: false }
    if (category.toString().length < 1 || category.toString().length > 3)
        return { message: '주제를 최소 2자 이상~ 3자 이하로 적어 주세요.', success: false }
    if (content.toString().length < 3)
        return { message: '내용을 최소 3자 이상 적어 주세요.', success: false }
    if (author.toString().length < 2)
        return { message: '작성자를 최소 2자 이상 적어주세요.', success: false }

    const decode = (jwt.verify(token, scrept) as JwtPayload) || ''
    const user = decode.data
    const userId = user.sub

    try {
        const db = await openDB()
        await db.query(insertQuery, [content, category, author, userId])

        return { message: '성공적으로 추가 하였습니다.', success: true }


    } catch (error) {
        return { message: '데이터베이스 에러: 유저 명언을 추가하지 못 했습니다.', success: false }
    } finally {
        revalidatePath('/user-quotes')
    }

} 