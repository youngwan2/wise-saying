import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '명언카드 만들기',
  description: '자신의 명언 카드를 만들 수 있는 편집 페이지 입니다.',
}

import QuoteStylerContainer from '@/components/UI/styler/QuoteStylerContainer'
export default function QuoteStylerPage() {
  return <QuoteStylerContainer />
}
