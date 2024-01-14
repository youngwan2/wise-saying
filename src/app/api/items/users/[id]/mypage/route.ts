import { openDb } from "@/connect"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req:NextRequest, res:{params: {id: string}}){

    const userId = res.params.id
    const db = await openDb()

    const joinQuery = `
        SELECT A.id AS id, A.wise_sayings AS wise_sayings, A.category AS category, A.author AS author, B.email AS email
        FROM quotes_user A JOIN users_group B
        ON A.user_id = B.user_id AND A.user_id = ?
        LIMIT 3
    `

    const items = await db.all(joinQuery,[userId])
    console.log(items)
    return NextResponse.json(items)
}