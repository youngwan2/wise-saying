'use client'

import { useRouter } from 'next/navigation'
import PageLoader from './PageLoader'

export default function ReplaceMessageCard({
  childern,
}: {
  childern?: string
}) {
  const router = useRouter()

  return (
      <PageLoader text={childern||"열심히 불러오는 중입니다.."}/>
  )
}
