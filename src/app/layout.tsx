import type { Metadata } from 'next'
import { Gowun_Dodum } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import ScrollAndNavButtons from '@/components/UI/common/ScrollAndNavButtons'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Timer from '@/components/UI/common/Timer'
import { SessionProvider } from 'next-auth/react'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const gowunDodum = Gowun_Dodum({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Wise Sayings',
    default: '위대한 말(Wise Sayings)',
  },
  keywords: '명언, 명언 커스텀, quotes, wise sayings, 명언 검색',
  description:
    '당신의 말이 명언이 될 수 있습니다. 단순한 말이 누군가에게는 인생의 전환점이 될 수 있습니다. 명언의 주인공이 되어 주세요.',
  openGraph : {
    type: "website",
    url: "https://wise-sayings.com",
    title: "Wise Sayings:: 위대한 말",
    description: "800개가 넘는 명언을 조회하고, 원하는 명언을 선택하여 공유 가능한 카드를 직접 만들어 생성할 수 있는 사이트입니다. 여러분의 말이 누군가에게는 명언이 될 수 있습니다. 무수히 많은 명언의 주인이 될 수 있습니다. 누군가에게는 희망을, 또 누군가 에게는 용기를, 또 다른 누군가에게는 영감을 주는 그런 명언을 만들어 보세요!",
    siteName: "Wise Sayings",
    // images: [{
    //   url: "https://이미지경로 : ",
    // }],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className=" bg-gradient-to-tr from-[#23346d] to-[#1b2d69]">
      <body className={`${gowunDodum.className}`} suppressHydrationWarning>
        <SessionProvider>
          <Header />
          <Timer />
          <main className="min-h-[100vh] w-full mx-auto max-w-[1700px] relative">
            <ToastContainer pauseOnFocusLoss={false} toastStyle={{top:50}}/>
            <Toaster containerStyle={{height:200, top:50}} />
            {children}
            <ScrollAndNavButtons />
          </main>
        </SessionProvider>
        <Footer/>
      </body>
    </html>
  )
}
