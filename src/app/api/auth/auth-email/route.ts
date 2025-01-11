import { HTTP_CODE } from "@/app/http-code";
import redisClient from "@/utils/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email, value: authValue } = await req.json()

    try {
        const redisAuthValue = await redisClient.get(email)

        const ttl = await redisClient.ttl(email)
        if (ttl < 1) {
            return NextResponse.json({ ...HTTP_CODE.GONE, meg: "인증 시간이 만료 되었습니다. 다시 시도 해주세요." }, { status: 410, statusText: "Gone" })
        }

        if (authValue === redisAuthValue) {
            redisClient.del(email)
            return NextResponse.json({ ...HTTP_CODE.NO_CONTENT, meg: "인증 되었습니다." })
        } else {
            return NextResponse.json({ ...HTTP_CODE.BAD_REQUEST, meg: "인증번호가 일치하지 않습니다." })
        }

    } catch (error) {
        console.error('/api/auth/general-auth/auth-email/route.ts', error)    
        return NextResponse.json({ ...HTTP_CODE.INTERNAL_SERVER_ERROR}) 
    }
}                                      

