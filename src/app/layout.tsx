import './globals.css'
import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/layout/Header'
import TimerContainer from '@/components/UI/common/TimerContainer';
import Footer from '@/components/layout/Footer'
import Script from 'next/script';
import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'

import type { Metadata, Viewport } from 'next'
import localFont from "next/font/local";


const APP_NAME = "위대한 말";
const APP_DEFAULT_TITLE = "다양한 명언들로 나만의 명언집을";
const APP_TITLE_TEMPLATE = "%s - 위대한 말";
const APP_DESCRIPTION = "다양한 명연의 세계로 빠져 보세요!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>
) {
  return (
    <html lang="ko" className={`${pretendard.className} bg-gradient-to-tr from-[#23346d] to-[#1b2d69]`}>
      {/* 상담 챗 봇 */}
      <Script id="show_chat_service">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/6670d4f4981b6c56477e4b5b/1i0kbvneu';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();`}
      </Script>

      <body suppressHydrationWarning>
        <Header />
        <TimerContainer />
        <main className="min-h-[100vh] w-full mx-auto max-w-[1700px] relative">
          <ToastContainer draggable draggablePercent={60} pauseOnFocusLoss={false} toastStyle={{ top: 50 }} />
          <Toaster containerStyle={{ height: 200, top: 50 }} />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
