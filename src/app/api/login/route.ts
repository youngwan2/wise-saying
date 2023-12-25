import { NextRequest, NextResponse } from "next/server";
import sqlite3 from 'sqlite3'
import jwt from 'jsonwebtoken'
import { open, Database } from 'sqlite'
import bcrpt from 'bcrypt'

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;
export async function POST(req: NextRequest) {
        if (!db) {
            db = await open({
                filename: './wise_saying.db',
                driver: sqlite3.Database

            })
        }
        // 유저 정보
        const { email, password } = await req.json()
        console.log(email, password)

        const query = `
        SELECT user_id, email, password FROM users_group
        WHERE email = ?
    `
        const user = await db.get(query, [email])

        // 암호화 비밀번호와 평문 비밀번호가 일치하는지 검증
        if (user) {
            const { user_id, email: dbEmail, password: dbPassword } = user
            const isValid = await bcrpt.compare(password, dbPassword)

            // 일치하는 경우 후속 처리
            
            if (isValid === true) {
                const scretKey:string = process.env.JWT_SCREPT!
                try {
                    const accessToken:any = await new Promise((resolve, reject) => {
                        jwt.sign(
                            {
                                userId: user_id,
                                userEmail: dbEmail
                            },
                            scretKey,
                            {
                                expiresIn:'1h'
                            },
                            (error: any, token: any) => {
                                if (error) return reject(error)
                                resolve(token)
                            }
                        )
                    })
                  const {userEmail} = jwt.decode(accessToken)
                    return NextResponse.json({ success: true, accessToken, user: userEmail })
                } catch (error) {
                    return NextResponse.json({success: false, meg:"토큰 서명에 문제가 발생하였습니다."})
                }

            }
        } else {
            return NextResponse.json({ success:false, meg:'해당 이메일 주소의 유저 정보가 존재하지 않습니다.' })
        }
}