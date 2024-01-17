import { openDb } from "@/connect"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest, res:{params:{category:string}}){
    const {category} = res.params    
    const db = await openDb()
    const page = req.nextUrl.searchParams.get('page')
    const limit = req.nextUrl.searchParams.get('limit')

    const query = `
        SELECT A.id AS id, A.author AS author, A.wise_sayings AS wise_sayings  
        FROM quotes_etc A JOIN etc_group B
        ON B.category_id = A.category_id AND B.category = ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?*15
    `
    const items = await db.all(query,[category, limit, page])
    return NextResponse.json(items)

}