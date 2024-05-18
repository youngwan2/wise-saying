import AdminHeader from '@/components/UI/admin/AdminHeader'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '관리자 페이지',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="h-[100vh] fixed top-0 left-0 right-0 bottom-0 bg-[#242424] z-[100000000000000]">
    <AdminHeader/>
    {children}
    </section>
}
