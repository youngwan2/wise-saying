import BackMoveButton from '@/components/UI/common/button/BackMoveButton'
import QuoteWriteForm from '@/components/UI/quote-editor/QuoteWriteForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '명언등록',
  description: '사용자가 명언을 등록하는 화면을 표시하는 페이지 입니다.',
}

export default function AddWisesayingPage() {
  return (
    <section>
      <QuoteWriteForm />
      <BackMoveButton />
    </section>
  )
}
