// import { NextResponse, type NextRequest } from 'next/server'
// import { hasAccessToken } from './utils/auth'

export async function middleware() {

  // const pathname = req.nextUrl.pathname

  // if (pathname.startsWith('/api/users')) {
  //   const hasToken = hasAccessToken(req)

  //   if (!hasToken) {
  //     return NextResponse.redirect('http://localhost:3000/login')
  //   }
  // }
}

// 일치하는 경로만 미들웨어가 실행된다.
export const config = {
  matcher: '/api/users/:path*'
}