import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET() {
    try {
        cookies().delete('refreshToken')
        revalidatePath('/logout')
        return NextResponse.json({ meg: '로그아웃 되었습니다. 이용해 주셔서 감사합니다.', status: 200 })
    } catch (error) {
        return NextResponse.json({ meg: '서버에서 문제가 발생하였습니다. 나중에 다시시도해 주세요.', status:500 })
    }
}