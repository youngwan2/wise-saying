import { openDB } from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: { params: { main: string } }) {

    const main = res.params.main || ''

    try {
        const db = await openDB();

        if (main === 'authors') {
            const query = `
            SELECT DISTINCT author, quote_id AS id FROM quotes 
        `
            const results = await db.query(query)
            const items = results.rows

            return NextResponse.json(items)
        }

        if (main !== 'authors') {
        const query = `
        SELECT DISTINCT ON(category) category, quote_id AS id FROM quotes 
        `
        const results = await db.query(query)
        const items = results.rows

        console.log(items)
 
        return NextResponse.json(items)
        }

    } catch (error) {
        console.error(error)

    }

}