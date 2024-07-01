import BackMoveButton from '@/components/UI/common/button/BackMoveButton'

import { Metadata } from "next"

export const metadata:Metadata= {
    title:'실시간 인기명언',
    description:'조회수가 높은 명언목록 100개를 실시간으로 조회하여 보여주는 페이지입니다.'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="overflow-hidden min-h-[40vh]">
      <BackMoveButton />
      {children}
    </section>
  )
}
