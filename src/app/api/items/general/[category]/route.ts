import { openDb } from "@/connect"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest, res:{params:{category:string}}){
    const {category} = res.params    
    const db = await openDb()

    const query = `
        SELECT A.id AS id, A.author AS author, A.wise_sayings AS wise_sayings  
        FROM quotes_etc A JOIN etc_group B
        ON B.category_id = A.category_id AND B.category = ?
        ORDER BY id DESC
    `
    const items = await db.all(query,[category])
    return NextResponse.json(items)

}