export const dynamic = 'force-dynamic' 

import { HTTP_CODE } from "@/app/http-code"
import { openDB } from "@/utils/connect";
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const db = await openDB();

        const selectQuery = `
        SELECT *  FROM quotes A 
        INNER JOIN views B ON A.quote_id = B.quote_id
        ORDER BY B.views DESC, A.quote_id ASC
        `

        const results = await db.query(selectQuery)
        const items = results.rows
        db.end()
        return NextResponse.json({ ...HTTP_CODE.OK, quotes: items })

    } catch (error) {
        console.error('/api/quotes/populars', error)
        return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
    }
}