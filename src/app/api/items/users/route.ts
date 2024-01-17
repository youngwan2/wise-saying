import { openDb } from "@/connect";
import { NextResponse } from "next/server";

export async function GET() {
    const db = await openDb()
    const joinQuery = `
        SELECT DISTINCT A.category AS category
        FROM quotes_user A JOIN users_group B
        ON A.user_id = B.user_id
        ORDER BY A.id DESC
    `

    const results = await db.all(joinQuery)

    const items = results.map((categories, i) => {
        return { category: categories.category, category_id: i }
    })

    return NextResponse.json(items)

}