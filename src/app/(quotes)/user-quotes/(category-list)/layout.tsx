import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '사용자 카테고리',
  description: '유저가 작성한 명언 목록을 볼 수 있는 페이지 입니다.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
