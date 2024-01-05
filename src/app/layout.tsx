import type { Metadata } from 'next'
import { Gowun_Dodum } from 'next/font/google'
import './globals.css'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import SubHeader from '@/components/Layout/SubHeader'
import BookmarkIcon from '@/components/UI/bookmark/BookmarkIcon'
import Bookmark from '@/components/UI/bookmark/Booklmark'


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
    <html lang="ko" className="bg-[rgba(100,155,850,0.8)]">
      <body className={`${gowunDodum.className}`}>
        <Header />
        <main id="main" className="flex bg-[white] max-w-[1600px] mx-auto rounded-[10px] relative">
          <SubHeader />
          <Bookmark/>
          <section className='max-w-[100%] min-h-[100vh]'>
            {children}</section>
        </main>
        <Footer />
      </body>
    </html>
  )
}
