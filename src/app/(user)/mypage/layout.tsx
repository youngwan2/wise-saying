import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '마이페이지 | My wise saying',
  description: '000 님의 마이페이지 입니디ㅏ.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="w-full">{children}</section>
}
