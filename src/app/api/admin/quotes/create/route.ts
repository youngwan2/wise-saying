import { HTTP_CODE } from "@/app/http-code";
import { tokenVerify } from "@/utils/auth";
import { openDB } from "@/utils/connect";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

const userSelectQuery = `
    SELECT *  FROM users
    WHERE user_id = $1
`

const authorSelectQuery = `
    SELECT author_id FROM authors
    WHERE author LIKE $1
`
const authorInsertQuery = `
    INSERT INTO authors(author)
    VALUES ($1)
`

const quoteSelectQuery = `
    SELECT * FROM quotes
    WHERE quote LIKE $1
`
const quoteInsertQuery = `
    INSERT INTO quotes(quote, category, author_id)
    VALUES ($1, $2,$3)

`
export async function POST(req: NextRequest) {
    const { '0': body } = await req.json();

    try {
        const { quote, category, author } = body

        // 유효성 검사
        const schema = Joi.object({
            author: Joi.string()
                .min(2)
                .max(15)
                .required(),

            quote: Joi.string()
                .min(1)
                .max(500)
                .required(),
            category: Joi.string()
                .min(4)
                .max(10),
        })

        const { error } = schema.validate(body)

        // 통과 못했으면 거절
        if (error) return NextResponse.json({ meg: error.message, status: 400, success: false })

        const { user, ...HTTP } = tokenVerify(req, true) as any

        const userId = user.sub
        const db = await openDB()

        const { is_admin: isAdmin } = (await db.query(userSelectQuery, [userId])).rows[0]

        // 관리자가 아니면 거절
        if (isAdmin !== "TRUE") return NextResponse.json(HTTP_CODE.UNAUTHORIZED)

        // 요청 명언이 이미 존재하는 경우 거절
        const hasQuote = !!(await db.query(quoteSelectQuery, [`%${quote}%`])).rowCount || !!0
        if (hasQuote) return NextResponse.json({ ...HTTP_CODE.BAD_REQUEST, meg: '이미 존재하는 명언 입니다.' })

        // 현재 내가 추가하고자 하는 저자가 존재하는지 체크 후 존재하는 경우에는 해당 id 가져온 후 명언 디비 저장
        const results = await db.query(authorSelectQuery, [`%${author}%`])

        // 동일 저자가 존재 : 명언만 추가
        if (results.rowCount !== null && results.rowCount > 0) {
            const { author_id: authorId } = results.rows[0]
            await db.query(quoteInsertQuery, [quote, category, authorId])

            db.end()

            return NextResponse.json(HTTP_CODE.CREATED)

        }
        // 저자가 없는 경우 : 저자와 명언 함께 추가
        if (results.rowCount !== null && results.rowCount <= 0) {

            await db.query(authorInsertQuery, [author])
            const results = await db.query(authorSelectQuery, [`%${author}%`])
            const { author_id: authorId } = results.rows[0]
            await db.query(quoteInsertQuery, [quote, category, authorId])
            db.end()
            return NextResponse.json(HTTP_CODE.CREATED)
        }
    } catch (error) {
        console.error('/api/admin/quote/create', error)
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR);
    }

}