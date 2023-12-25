import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import jwt from "jsonwebtoken";
import { open, Database } from 'sqlite'

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null

export async function POST(req: NextRequest) {
    const scrept = process.env.JWT_SCREPT!
    const token = req.headers.get('authorization')?.replace('Bearer ', '')!

    // 토큰이 존재하지 않는 경우
    if (!token) {
        console.log(token)
        return NextResponse.json({ status: 401, success: false, message: "유효한 토큰이 존재하지 않습니다." })
    }
    // 데이터베이스가 존재하지 않는 경우
    if (!db) {
        db = await open({
            driver: sqlite3.Database,
            filename: './wise_saying.db'
        })
    }

    try {
        const { category, wise_sayings, author, userEmail } = await req.json()
        jwt.verify(token, scrept, async (err, decode) => {
            // 토큰 검증에 실패한 경우
            if(err) {
                return NextResponse.json({status:401, success:false, message:"토큰이 만료되었습니다. 다시 로그인 해주세요."})
            }
            const selectQuery = `
                SELECT user_id FROM users_group
                WHERE email = ?
            `

            const { user_id: userId } = await db?.get(selectQuery, [userEmail])
            const isUser = !!userId
            // 유저가 존재 한다면 포스트 추가
            if (isUser) {
                const insertQuery = `
                INSERT INTO quotes_users(wise_sayings, user_id,category, author)
                VALUES (?,?,?,?)
            `
                try {
                    db?.all(insertQuery, [wise_sayings, userId, category, author])

                } catch (error) {
                    console.error(error)
                }
            }
        })
    } catch (error) {
        console.error(error)
    }

    return NextResponse.json({ status: 201, success: true })
}
