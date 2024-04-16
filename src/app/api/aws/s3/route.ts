import { HTTP_CODE } from "@/app/http-code";
import { main } from "@/s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const base64ImgUrl:string = await req.json() || ''
    const imgData= Buffer.from(base64ImgUrl.replace(/^data:image\/\w+;base64,/,""), 'base64')


    try {
        const isSend = await main("user-card",imgData)

        if(isSend) return NextResponse.json({ ...HTTP_CODE.CREATED, meg: '명언 전시관 등록 완료' })
        else {return NextResponse.json({...HTTP_CODE.NOT_FOUND, meg: '명언 전시관 등록 실패' }) }
    } catch (error) {
        return NextResponse.json({ ...HTTP_CODE.CREATED })
    }

}