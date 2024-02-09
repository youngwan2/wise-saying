import {cookies} from 'next/headers'
import {NextResponse, NextRequest} from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(req:NextRequest){

    cookies().delete('refreshToken')
    revalidatePath('/logout')
    return NextResponse.json({meg:'로그아웃 되었습니다. 이용해 주셔서 감사합니다.', status:200})
    
}