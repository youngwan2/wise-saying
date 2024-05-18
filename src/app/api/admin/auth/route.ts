import { HTTP_CODE } from "@/app/http-code";
import { tokenVerify } from "@/utils/auth";
import { openDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET | 관리자 인지 아닌지 
export async function GET(req:NextRequest){

    const {user} = tokenVerify(req, true) as any

    const userId  = user.sub
    try {
    const db = await openDB()
    const query = `
    SELECT is_admin FROM users
    WHERE user_id = $1
    `
    const {is_admin:isAdmin} = (await db.query(query, [userId])).rows[0]
    
    if(isAdmin !=="TRUE") return NextResponse.json(HTTP_CODE.UNAUTHORIZED)
    return NextResponse.json(HTTP_CODE.OK)

} catch(error){

    console.log('admin/auth',error)
    return NextResponse.json(HTTP_CODE.INTERNAL_SERVER_ERROR)
}

}