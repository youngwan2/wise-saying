import { HiOutlineMail } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { useState } from 'react'

interface PropsType {
  isEmail: boolean
  email: string
  setIsEmail: (p: boolean) => void
  setEmail: (p: string) => void
  setExistsEmail: (p: boolean) => void
}

export default function SignInEmailInput({
  isEmail,
  email,
  setIsEmail,
  setEmail,
  setExistsEmail,
}: PropsType) {

  const [isLoading, setIsLoading] = useState(false)

  // 이메일 유효성 검사
  function emailChecker(email: string) {
    const test = /[a-z0-9]@[a-z]+\.[a-z]{3,}/g.test(email)
    if (test) return setIsEmail(true)
    return setIsEmail(false)
  }

  // 이미 존재하는 이메일인지 검사
  function userExists(email: string) {
    setIsLoading(true)
    fetch(`/api/users`, {
      method: 'POST',
      body: JSON.stringify(email),
    }).then(async (response) => {
      const res = await response.json()
      const { status, meg } = res
      if (status === 201) {
        setExistsEmail(true)
        toast.success(meg + '다음을 진행해 주세요.')
      }
      if (status !== 201) {
        setExistsEmail(false)
        toast.error(meg)
      }
      setIsLoading(false)
    })
  }

  return (
    <article className="mt-[3.5em] mb-[1em] mx-[10px]">
      <div className="flex">
        {/* 이메일 입력 Input */}
        <label
          className="rounded-s-lg bg-[#3F3F3F] text-[white] text-center p-[0.8em] inline-block min-w-[50px]"
          htmlFor="user-email"
        >
          <span className=" inline-block">
            <HiOutlineMail />
          </span>
        </label>
        <input
          onInput={(e) => {
            const email = e.currentTarget.value
            console.log(email)
            emailChecker(email)
            setEmail(email)
          }}
          className="pl-[8px]  min-w-[230px] w-[100%] bg-[#ffffffce]"
          type="email"
          id="user-email"
          name="user-email"
          placeholder="이메일"
        />

        {/* 확인 버튼 */}
        <button
          onClick={() => {
            userExists(email)
          }}
          className="bg-[white] min-w-[50px] rounded-r-[5px] hover:shadow-[0px_0px_0px_2px_black]"
        >
          {isLoading?'대기':'확인'}
        </button>
      </div>

      {/* 일치 여부 메시지 */}
      {isEmail ? (
        <span className="block px-[5px] text-[#292997] ml-[0.5em]">
          - 이메일 형식과 일치합니다.
        </span>
      ) : (
        <>
          <span className="text-[#444141] block ml-[0.5em] ">
            - ex. example@domain.com 혹은 domain.net
          </span>
          <span className="text-[red] block  ml-[0.5em]">
            - 이메일 형식과 일치시키세요
          </span>
        </>
      )}
    </article>
  )
}
