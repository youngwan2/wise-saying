
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: '로그인',
  description: '로그인 페이지 입니다.',
}

export default function Layout({ children }: any) {
  return (
      <section>{children}</section>
  )
}
