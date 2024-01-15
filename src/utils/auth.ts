import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'

export const accessTokenVerify= (req: NextRequest) => {

    const rawToken = req.headers.get('authorization')?.split(' ') || []
    const token = rawToken[1]
    const scrept = process.env.JWT_SCREPT || ''
    const prefix = 'Bearer'

    if (prefix !== rawToken[0]) {
        return NextResponse.json({ meg: '정상적인 accessToken 요청 형식이 아닙니다. 접두사를 확인해주세요.', status: 400, success: false })

    }

    if (!token) {
        return NextResponse.json({ meg: '요청 토큰을 찾을 수 없습니다. 확인 후 양식에 맞춰서 다시 보내주세요.', status: 400, stateText: 'Bad Request', success: false })
    }

    const vaildToken = jwt.verify(token, scrept ) as JwtPayload
    
    if(!vaildToken) {
        return NextResponse.json({meg : '토큰이 만료되었습니다. 다시 로그인을 시도해주세요.', status : 401, success:false})
    }
    
    const user = vaildToken.data
    console.log(user)
    return true
}