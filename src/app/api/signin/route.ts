import joi from 'joi'
import bcrpt from 'bcrypt'
import { NextRequest, NextResponse } from "next/server";
import { openDb } from '@/connect';



export async function POST(req:NextRequest){

    const db = await openDb()

    const query = `
        INSERT INTO users_group(email, password)
        VALUES (?,?)
    `

    // 암호화 설정(옵션)
    const saltRounds = 10 ;

    // 유효성 검사
    const {email,password,reConfirmPw} = await req.json()
    const schema = joi.object({
        email : joi.string()
        .email({maxDomainSegments:2, tlds:{allow:[`com`,`net`]}}),
        password:joi.string()
        .pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$/)),
        reConfirmPw: joi.ref(`password`)
    })
    
    // 검증 결과
    const result = schema.validate({email, password, reConfirmPw})

    if(result.error){
        return NextResponse.json({meg:result.error.details, success:false, status:401})
    }
        const {email : validEmail,password : validPs} = result.value

        // 해시 암호화
        bcrpt.hash(validPs, saltRounds, function (err, hash){
            db.all(query, [validEmail, hash])
        })

        return NextResponse.json({meg:"정상적으로 처리되었습니다.", status: 201, success:true})
}