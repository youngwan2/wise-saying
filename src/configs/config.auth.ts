import Google from 'next-auth/providers/google'


const {
    AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET,
    AUTH_SECRET,
} = process.env


import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'


export const authConfig = {

    // 소셜로그인 서비스 제공자 옵션 구성 정보 입력
    providers: [Google({
        clientId: AUTH_GOOGLE_ID || '',
        clientSecret: AUTH_GOOGLE_SECRET || '',
    })]
} satisfies NextAuthConfig


export const { handlers: { GET, POST }, auth } = NextAuth(authConfig)