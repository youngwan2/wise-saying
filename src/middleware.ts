import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const hasAuthor = path.startsWith('/author/')
  if (hasAuthor) {
    const newPath = path.replaceAll('/author/', '')
    const decodingPath = decodeURIComponent(newPath)

    const response = NextResponse.next()
    response.cookies.set({
      name: 'pathName',
      value: decodingPath,
    })

    return response
  }
}
