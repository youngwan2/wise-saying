import React from 'react'

export default function FormTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="rounded-t-[10px]  p-[10px] text-[1.25em] shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.1)] text-[white]">
      {children}
    </h2>
  )
}
