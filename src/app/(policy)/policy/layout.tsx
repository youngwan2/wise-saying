import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '정책',
  description: '사이트 이용약관 및 개인정보처리방침 등의 사이트 정책을 확인할 수 있는 페이지입니다.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="min-h-[100vh] mx-auto max-w-[1200px] w-full">{children}</section>
}
