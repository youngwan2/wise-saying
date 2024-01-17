import { openDb } from "@/connect";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken'



// 북마크 삭제
export async function DELETE(req:NextRequest,res:{params: {id: string}} ) {
    const {id} =  res.params
    const db = await openDb();
    const scrept = process.env.JWT_SCREPT!
    const token = req.headers.get('Authorization')?.replace('Bearer ','').trim();

    if(!token) {
        return NextResponse.json({meg:"토큰이 유효하지 않습니다. 다시 로그인 해주세요.", status: 401})

    }

    const result = jwt.verify(token,scrept) as jwt.JwtPayload
    if(!result){
        return NextResponse.json({meg:"토큰이 만료되었습니다. 다시 로그인 해주세요.", status: 403})

    }

    const {userId} = result.data
    const query =
    `
     DELETE FROM  bookmarks
     WHERE bookmark_id = ? AND user_id = ?
    `
    try {
     await db.all(query, [id, userId])

    } catch(error){
        return NextResponse.json({status: 500, meg:"사버에서 처리 중 문제가 발생 하였습니다. 나중에 다시 시도해주세요."})
    }
    
    return NextResponse.json({meg:"정상적으로 처리되었습니다.", status: 204})
    
}