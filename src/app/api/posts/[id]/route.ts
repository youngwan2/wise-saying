import { NextRequest, NextResponse } from "next/server";
import { open, Database } from 'sqlite'
import sqlite3 from "sqlite3";
import Jwt from "jsonwebtoken";


let db: Database<sqlite3.Database, sqlite3.Statement> | null = null
export async function DELETE(req: NextRequest, res: { params: { id: string } }) {
    const scrept = process.env.JWT_SCREPT!
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')!
    const { id } = res.params
    if (!db) {
        db = await open({
            filename: './wise_saying.db',
            driver: sqlite3.Database
        })
    }

    try {
        const result = Jwt.verify(token, scrept)
        const isValid = !!result
        if (isValid) {
            const query = `
            DELETE FROM quotes_users
            WHERE id = ?
        `
            db.all(query, [id])
            return NextResponse.json({ status: 201, success: true })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 401, success: false, message: "유효한 토큰이 아닙니다." })
    }

}