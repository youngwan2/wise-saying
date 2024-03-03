import {generateQuoteBy} from "@/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { '0': content } = await req.json()

    if(content.length<5) return NextResponse.json({meg:"5자 이상 적어주세요.", success:false, status:401, result: '5자 이상 입력 바람.'})

    const aiQuote = await generateQuoteBy(content)

    return NextResponse.json({ meg: "성공적으로 처리되었습니다.", success: true, status: 200, result: aiQuote })


}