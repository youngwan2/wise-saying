import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {

  const requestHeaders = new Headers(req.headers)
  const type = req.nextUrl.searchParams.get('type') || ''

  const response = NextResponse.next({
    request: {
      headers:requestHeaders
    }
  })
  
  response.headers.set('x-path-type', type)
  return response

}

//일치하는 경로만 미들웨어가 실행된다.
export const config = {
  matcher: ['/add-wisesaying', '/update-wisesaying', '/logout', '/quotes/authors/:path*'],
}
