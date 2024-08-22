'use client'

import { ReactNode } from 'react'
import PageLoader from '../PageLoader'

export default function ReplaceMessageCard({
  children,
  isFull
}: {
  children?: ReactNode
  isFull?:boolean
}) {
  return (
      <PageLoader isFull={isFull}>
        {children}
      </PageLoader>
  )
}
