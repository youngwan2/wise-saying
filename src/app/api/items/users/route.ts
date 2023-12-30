import { openDb } from "@/connect";
import { NextResponse } from "next/server";

export async function GET(){
    const db = await openDb()
    const joinQuery = `
        SELECT A.id AS id, A.wise_sayings AS wise_sayings, A.category AS category, A.author AS author, B.email AS email
        FROM quotes_users A JOIN users_group B
        ON A.user_id = B.user_id
        ORDER BY A.id DESC
    `


    const items = await db.all(joinQuery)
    return NextResponse.json(items)

}