import { NextRequest, NextResponse } from "next/server";
import Jwt  from "jsonwebtoken";
import { openDb } from "@/connect";

export async function GET(req:NextRequest, res:{params: {id: string}}){
    const postId = res.params.id
    const db = await openDb()

    const joinQuery = `
        SELECT A.id AS id, A.wise_sayings AS wise_sayings, A.category AS category, A.author AS author, B.email AS email
        FROM quotes_users A JOIN users_group B
        ON A.user_id = B.user_id AND A.id = ?
    `
    const items = await db.all(joinQuery,[postId])
    return NextResponse.json(items)
}

export async function PUT(req:NextRequest, res:{params: {id: string}}){
    const postId = res.params.id
    const accessToken = req.headers.get("Authorization")?.replace("Bearer ","")!
    const scrept = process.env.JWT_SCREPT!
    const {wise_sayings, category, author} = await req.json()
    
    const db = await openDb()
    
    try {
       const validToken = Jwt.verify(accessToken, scrept)
    
       if(!!validToken) {
        const query =`
            UPDATE quotes_users SET wise_sayings = ?, category = ?, author = ?
            WHERE id = ?
        `

        db.all(query, [wise_sayings, category, author, postId])

        return NextResponse.json({status:201, success:true})
       }
    } catch(error){
        return NextResponse.json({status:401, success:false, message:"유효 토큰이 만료되었습니다."})
    }
}
