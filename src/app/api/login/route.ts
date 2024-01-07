import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import { openDb } from "@/connect";

export async function POST(req: NextRequest) {
    const scrept = process.env.JWT_SCREPT as string
    const db = await openDb()
    // 유저 정보
    const { email, password } = await req.json()
    const query = `
        SELECT user_id, email, password FROM users_group
        WHERE email = ?
    `
    const user = await db.get(query, [email])

    // 암호화 비밀번호와 평문 비밀번호가 일치하는지 검증
    if (user) {
        const { email, password: dbPassword, user_id } = user
        const isUser = await bycrypt.compare(password, dbPassword)

        if(isUser) {
        const createToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: {email, userId:user_id}
        }, scrept);
        const decode = jwt.verify(createToken, scrept) as jwt.JwtPayload
        const {email: validEmail} = decode.data

        return NextResponse.json({ success: true, meg: '정상적으로 처리 되었습니다..', status: 201, email: validEmail, accessToken: createToken})        
     }
        return NextResponse.json({ success: false, meg: '비밀번호가 일치하지 않습니다.', status: 403})
    } else {
        return NextResponse.json({ success: false, meg: '유저 정보(이메일) 존재하지 않거나, 잘못 입력하였습니다.', status: 403 })
    }
}