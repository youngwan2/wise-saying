'use client'

import { Suspense, useId, useRef, useState } from 'react'
import useDraggable from '@/custom/useDraggable'

import ForgotEmail from '@/components/UI/auth/forgot/ForgotEmail'
import ForgotPassword from '@/components/UI/auth/forgot/ForgotPassword'
import ForgotTapButtons from '@/components/UI/auth/forgot/ForgotTapButtons'
import BackMoveButton from '@/components/UI/common/button/BackMoveButton'

export default function ForgotPage() {
  const uId = useId()
  const [tapNum, setTapNum] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  useDraggable(sectionRef, 'free')

  function onClickSetTap(tapIndex: number) {
    setTapNum(tapIndex)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="absolute left-[50%] translate-x-[-50%] top-[30%] max-w-[490px] w-full text-center bg-transparent px-[20px] py-[2em] pb-[4em] rounded-[10px] shadow-[inset_0_0_0_2px_white]"
      >
        <ForgotTapButtons tapNum={tapNum} onClickSetTap={onClickSetTap} />
        <Suspense>
          {tapNum === 0 ? (
            <ForgotEmail uId={uId}/>
          ) : (
            <ForgotPassword uId={uId} />
          )}
        </Suspense>
      </section>
      <BackMoveButton />
    </>
  )
}
