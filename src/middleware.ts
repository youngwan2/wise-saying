import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Jwt } from 'jsonwebtoken'

export function middleware(request: NextRequest) {


  console.log(request.method)
}
