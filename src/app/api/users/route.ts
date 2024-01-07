import { NextRequest, NextResponse } from "next/server";
import { openDb } from "@/connect";


export async function POST(req:NextRequest){
    try {
    const email = await req.json()
    const db = await openDb()

    
    const query = `
        SELECT * FROM users_group
        WHERE email = ?
    `
    const user = await db.get(query,[email])
    if(!user) {
        throw Error("유저 정보가 존재하지 않습니다.")
    }
    
    return NextResponse.json({meg:'이미 존재하는 이메일 입니다.', status: 409, success: false})

} catch(error){
    return NextResponse.json({meg:"존재하지 않는 이메일 입니다.",status:201, success:true})
}

    
}