"use client"


import {SessionProvider} from "next-auth/react"
import { useEffect } from "react"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {


  useEffect(()=>{
    document.title = '로그인 | wise sayings'
  })
 
  return (
    <section><SessionProvider>{children}</SessionProvider></section>
    )
}
