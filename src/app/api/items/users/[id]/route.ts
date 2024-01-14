import { NextRequest, NextResponse } from "next/server";
import Jwt  from "jsonwebtoken";
import { openDb } from "@/connect";

// 조회
export async function GET(req:NextRequest, res:{params: {id: string}}){

    const postId = res.params.id
    const db = await openDb()

    const joinQuery = `
        SELECT id, wise_sayings, category, author, B.email AS email
        FROM quotes_user A JOIN users_group B
        ON A.user_id = B.user_id
        WHERE id = ?
        LIMIT 1
    `

    const item = await db.get(joinQuery,[postId])
    console.log(item)
    if(!item ) return NextResponse.json({meg:'요청한 자료가 존재하지 않습니다.', status:404, success:false})
    return NextResponse.json({meg:"정상적으로 처리되었습니다.", status: 200, success:true, item})
}


// 수정
export async function PUT(req:NextRequest, res:{params: {id: string}}){
    const postId = res.params.id
    const accessToken = req.headers.get("authorization")?.replace("Bearer ","")!
    const scrept = process.env.JWT_SCREPT!
    const {wise_sayings, category, author} = await req.json()
    
    const db = await openDb()
    
    try {
       const validToken = Jwt.verify(accessToken, scrept)
    
       if(!!validToken) {
        const query =`
            UPDATE quotes_user 
            SET wise_sayings = ?, category = ?, author = ?
            WHERE id = ?
        `

        db.all(query, [wise_sayings, category, author, postId])

        return NextResponse.json({status:201, success:true})
       }
    } catch(error){
        return NextResponse.json({status:401, success:false, message:"유효 토큰이 만료되었습니다."})
    }
}
