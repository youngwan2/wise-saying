export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '명언등록',
  description: '사용자가 명언을 등록하는 화면을 표시하는 페이지 입니다.',
}

import UpdateForm from '@/components/UI/quote-editor/QuoteEditForm'
import BackMoveButton from '@/components/UI/common/BackMoveButton'

export default function UpdatePage() {
  return (
    <section>
      <UpdateForm />
      <BackMoveButton />
    </section>
  )
}
