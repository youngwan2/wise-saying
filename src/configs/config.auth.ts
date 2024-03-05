import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'

const {
    NEXTAUTH_GOOGLE_ID,
    NEXTAUTH_GOOGLE_SECRET,
    NEXTAUTH_SECRET,
} = process.env


export const authConfig = {
    trustHost:true,
    // 소셜로그인 서비스 제공자 옵션 구성 정보 입력
    providers: [Google({
        clientId: NEXTAUTH_GOOGLE_ID || '',
        clientSecret: NEXTAUTH_GOOGLE_SECRET || '',
    })]
} satisfies NextAuthConfig


export const { handlers: { GET, POST }, auth } = NextAuth(authConfig)


