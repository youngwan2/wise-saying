'use client'

import ForgotEmail from '@/components/UI/auth/forgot/ForgotEmail'
import ForgotPassword from '@/components/UI/auth/forgot/ForgotPassword'
import ForgotTaps from '@/components/UI/auth/forgot/ForgotTaps'
import BackMoveButton from '@/components/UI/common/BackMoveButton'
import { Method, defaultConfig } from '@/configs/config.api'
import useDraggable from '@/custom/useDraggable'
import { defaultFetch } from '@/utils/fetcher'
import { useId, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function ForgotPage() {
  const uId = useId()

  const [tapNum, setTapNum] = useState(0)

  function onClickSetTap(tapIndex: number) {
    setTapNum(tapIndex)
  }

  // Action : 이메일 찾기
  async function findEmailAction(formData: FormData) {
    const email =
      formData
        .get(uId + 'email')
        ?.valueOf()
        .toString() || ''
    const config = defaultConfig(Method.POST, email)
    const url = '/api/auth/general-auth/forgot/email'
    const { success, meg } = await defaultFetch(url, config)
    if (success) toast.success(meg)
    else toast.error(meg)
  }

  // Action: 비밀번호 재발급
  async function findPasswordAction(formData: FormData) {
    const email =
      formData
        .get(uId + 'email')
        ?.valueOf()
        .toString() || ''
    const config = defaultConfig(Method.POST, email)
    const url = '/api/auth/general-auth/forgot/password'
    const { success, meg } = await defaultFetch(url, config)
    if (success) toast.success(meg)
    else toast.error(meg)
  }

  const sectionRef = useRef<HTMLElement>(null)
  useDraggable(sectionRef,'free')

  return (
    <>
      <section ref={sectionRef} className="absolute left-[50%] translate-x-[-50%] top-[30%] max-w-[490px] w-full text-center bg-transparent px-[20px] py-[2em] pb-[4em] rounded-[10px] shadow-[inset_0_0_0_2px_white]">
        <ForgotTaps tapNum={tapNum} onClickSetTap={onClickSetTap} />
        {tapNum === 0 ? (
          <ForgotEmail uId={uId} action={findEmailAction} />
        ) : (
          <ForgotPassword uId={uId} action={findPasswordAction} />
        )}
      </section>
      <BackMoveButton />
    </>
  )
}
