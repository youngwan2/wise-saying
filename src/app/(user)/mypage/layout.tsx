import BackMoveButton from '@/components/UI/common/BackMoveButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '마이페이지',
  description: '마이페이지 입니디.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="w-full">{children}  <BackMoveButton/></section>
}
