'use client'

import PageLoader from './PageLoader'

export default function ReplaceMessageCard({
  childern,
  isFull
}: {
  childern?: string
  isFull?:boolean
}) {
  return (
      <PageLoader text={childern||"열심히 불러오는 중입니다.."} isFull={isFull}/>
  )
}
