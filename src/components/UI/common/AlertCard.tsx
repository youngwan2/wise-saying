'use client'

import { useEffect, useState } from 'react'

interface PropsType {
  message: string
  toggle: boolean
}
export default function AlertCard({ toggle, message }: PropsType) {
  const [toggleState, setToggleState] = useState(false)

  useEffect(() => {
    let clear: NodeJS.Timeout
    if (toggle) {
      setToggleState(true)

      clear = setTimeout(() => {
        setToggleState(false)
      }, 2000)
    }

    return () => {
      clearTimeout(clear)
    }
  }, [toggle])

  return (
    <article
      className={`${
        toggleState
          ? 'visible opacity-100 top-[3em]'
          : 'invisible opacity-0 top-0'
      } fixed left-[50%] translate-x-[-50%] bg-[#fab152] p-[8px] rounded-[5px] shadow-[inset_-2px_-2px_5px_0_rgba(85,85,22,0.6)] text-white  top-[-8em] transition-all w-[150px]`}
    >
      <h2>{message}</h2>
    </article>
  )
}
