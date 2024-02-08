import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createToken, tokenVerify } from "@/utils/auth";


export async function POST(req: NextRequest) {
    const { status, meg, success, user } = tokenVerify(req, false)

    if (status === 400) {
        return NextResponse.json({ status, success, meg })
    }
    if (status === 401) {
        return NextResponse.json({ status, success, meg })
    }

    const refreshToken = createToken(user, false)

    cookies().set({
        name: 'refreshToken', // 쿠키 이름
        value: 'Bearer ' + refreshToken, // 쿠키에 저장할 값
        httpOnly: true, // 자바스크립트로 접근 불가능(Only HTTP 로만 전송 가능, XSS 공격 방지)
        secure: true, // 오직 안전한 연결인 HTTPS 에서만 사용가능(로컬 환경에서는 http 허용 해줌)
        path: '/', // 쿠키에 접근할 수 있는 사이트 경로
    })
}