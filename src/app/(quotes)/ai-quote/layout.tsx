import { Metadata } from "next"



export const metadata: Metadata = {
    title: 'AI명언',
    description: '인공지능 명언 생성 서비스를 이용하는 페이지 입니다.'
}



export default function Layout({ children }: { children: React.ReactNode }) {

    return <section className="h-[100vh]">{children}</section>
}