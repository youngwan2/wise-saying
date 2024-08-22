'use client'

import PageLoader from '../PageLoader'

export default function ReplaceMessageCard({
  children,
  isFull
}: {
  children?: string
  isFull?:boolean
}) {
  return (
      <PageLoader text={children||"열심히 불러오는 중입니다.."} isFull={isFull}/>
  )
}
