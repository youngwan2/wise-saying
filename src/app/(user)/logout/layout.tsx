"use client"

import {SessionProvider} from "next-auth/react"
// import { useEffect } from "react"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <section><SessionProvider>{children}</SessionProvider></section>
    )
}
