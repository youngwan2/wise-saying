import type { Metadata } from 'next'
import { Gowun_Dodum } from 'next/font/google'
import './globals.css'
import Footer from '../components/Layout/Footer'
import Header from '@/components/Layout/Header'
import Nav from '@/components/Layout/Nav'


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
    <html lang="ko" className="bg-[#dadad7]">
      <body className={`${gowunDodum.className}`}>
        <Header />
        <div className="flex bg-[#ffffff] backdrop-blur-[5px] max-w-[1600px] mx-auto rounded-[10px] shadow-[0_0_1px_1px_gray]">
          <Nav />
          <main className='max-w-[100%] min-h-[100vh]'>
            {children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
