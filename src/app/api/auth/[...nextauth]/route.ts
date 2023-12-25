import NextAuth from "next-auth/next";
import GithubProvider  from "next-auth/providers/github"

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    secret:process.env.AUTH_SECRET
})

export {handler as GET, handler as POST}