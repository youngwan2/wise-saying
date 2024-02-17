import QuoteWriteForm from '@/components/UI/post/QuoteWriteForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '명언등록',
  description: '사용자가 명언을 등록하는 화면을 표시하는 페이지 입니다.',
}

export default function AddWisesayingPage() {
  return (
    <section className="z-[1000] fixed left-0 right-0 top-0 bottom-0 bg-[#00000065] ">
      <QuoteWriteForm />
    </section>
  )
}
