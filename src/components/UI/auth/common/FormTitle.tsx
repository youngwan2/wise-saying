import React from 'react'

export default function FormTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="rounded-t-[10px]  p-[10px] text-[1.25em] shadow-[inset_0_-2px_0_0_white] text-[white]">
      {children}
    </h2>
  )
}
