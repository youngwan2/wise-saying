import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { HTTP_CODE } from '@/app/http-code'

export async function GET() {
  try {
    cookies().delete('refreshToken')
    revalidatePath('/logout')
    return NextResponse.json({
      ...HTTP_CODE.NO_CONTENT,
      meg: '로그아웃 되었습니다. 이용해 주셔서 감사합니다.',
    })
  } catch (error) {
    return NextResponse.json( HTTP_CODE.INTERNAL_SERVER_ERROR )
  }
}
