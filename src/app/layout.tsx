import type { Metadata } from 'next'
import { Gowun_Dodum } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import ScrollAndNavButtons from '@/components/UI/button/ScrollAndNavButtons'

const gowunDodum = Gowun_Dodum({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template :'%s | Wise Sayings',
    default : 'Wise Sayings'
  },
  keywords:"명언, 명언 커스텀, quotes, wise sayings, 명언 검색",
  description:
    '나만을 위한 명언들을 모아서 볼 수 있는 애플리케이션입니다. 언제든지 자신이 원하는 명언을 수집할 수 있고, 직접 명언을 만들어 볼 수도 있습니다.',
  // openGraph : {
  //   type: "website",
  //   // url: "https://사이트주소",
  //   title: "Wise Sayings",
  //   description: "800개가 넘는 명언을 조회하고, 원하는 명언을 선택하여 공유 가능한 카드를 생성할 수 있는 사이트입니다.",
  //   siteName: "Wise Sayings",
  //   // images: [{
  //   //   url: "https://이미지경로 : ",
  //   // }],
  // }
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
        <main className="min-h-[100vh] w-full mx-auto max-w-[1700px] relative">
          {children}
          <ScrollAndNavButtons/>
        </main>
      </body>
    </html>
  )
}
