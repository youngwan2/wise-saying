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
    INSERT INTO authors(author, job, birth, intro)
    VALUES ($1,$2,$3,$4)
`

const authorUpdateQuery = `
    UPDATE authors SET job = $2,birth = $3, intro =$4
    WHERE  author = $1
`

export async function POST(req: NextRequest) {
    const { '0': body } = await req.json();
    try {
        const { author, job, birth, intro } = body

        // 유효성 검사
        const schema = Joi.object({
            author: Joi.string()
                .min(2)
                .max(20)
                .required(),

            job: Joi.string()
                .min(1)
                .max(20)
                .required(),

            birth: Joi.string()
                .min(4)
                .max(30),

            intro: Joi.string()
                .min(6)
                .max(500)
                .required()
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
        
        const hasAuthor = (await db.query(authorSelectQuery, ['%' + author + '%'])).rowCount || 0 > 0

        // 우선, 현재 author 가 존재한다면 바로 내용 업데이트 후 응답
        if (hasAuthor) {
            console.log(hasAuthor)
            await db.query(authorUpdateQuery, [author,job, birth, intro])
            db.end()
            return NextResponse.json({...HTTP_CODE.CREATED,meg:'수정 되었습니다.'})

            // 존재하지 않으면 새로운 author 추가
        } else {
            console.log("추가")
            await db.query(authorInsertQuery, [author, job, birth, intro])
            db.end()
            return NextResponse.json(HTTP_CODE.CREATED)
        }


    } catch (error) {
        console.error('/api/admin/authors/update', error)
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR);
    }

}