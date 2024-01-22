import { HiOutlineMail } from 'react-icons/hi'

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

    // 이메일 유효성 검사
  function emailChecker(email: string) {
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,}/g
    const test = regex.test(email)
    if (test) return setIsEmail(true)
    return setIsEmail(false)
  }

  // 이미 존재하는 이메일인지 검사
  function userExists(email: string) {
    fetch(`/api/users`, {
      method: 'POST',
      body: JSON.stringify(email),
    }).then(async (response) => {
      const res = await response.json()
      const { status } = res
      if (status === 201) {
        setExistsEmail(true)
        alert('확인 되었습니다. 다음을 진행해주세요.')
      }
      if (status === 409) {
        setExistsEmail(false)
        alert('중복된 이메일입니다.')
      }
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
          확인
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
            - ex. email@naver.com
          </span>
          <span className="text-[red] block  ml-[0.5em]">
            - 이메일 형식과 일치시키세요
          </span>
        </>
      )}
    </article>
  )
}
