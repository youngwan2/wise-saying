import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {


}

// 일치하는 경로만 미들웨어가 실행된다.
export const config = {
  matcher: ['/add-wisesaying', '/update-wisesaying', '/logout'],
}
