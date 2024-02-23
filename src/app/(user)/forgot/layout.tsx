import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '이메일/비밀번호 찾기',
  description: '이메일 및 비밀번호 찾기 페이지입니다.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
