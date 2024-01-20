import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '로그인 | wise sayings',
  description: '로그인 페이지 입니다.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
