import type { Metadata } from 'next'
import { Gowun_Dodum } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'

const gowunDodum = Gowun_Dodum({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Wise Saying',
  description:
    '나만을 위한 명언들을 모아서 볼 수 있는 애플리케이션입니다. 언제든지 자신이 원하는 명언을 수집할 수 있고, 직접 명언을 만들어 볼 수도 있습니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className=" h-full bg-[#162557]">
      <body className={`${gowunDodum.className} h-[100vh]`}>
        <Header />
        {/* <Nav /> */}
        <main className="min-h-[100vh] h-full w-full mx-auto max-w-[1700px] relative">
          {children}
        </main>
      </body>
    </html>
  )
}
