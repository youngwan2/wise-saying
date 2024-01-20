import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '로그아웃 | wise sayings',
  description:
    '로그아웃 이전에 사용자에게 로그아웃 관련 안내 메시지를 보여주는 페이지 입니다.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
