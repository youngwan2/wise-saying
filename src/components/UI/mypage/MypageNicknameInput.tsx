import { useEffect, useRef } from 'react'

interface PropsType {
  nickname: string
}
export default function MypageNicknameInput({ nickname }: PropsType) {
  const nicknameRef = useRef<HTMLInputElement>(null)
  // 닉네임 초깃값 지정
  useEffect(() => {
    if (!nicknameRef.current) return
    const nicknameInput = nicknameRef.current
    nicknameInput.value = nickname || ''
  }, [nickname])

  return (
    <div className="mx-auto my-[5px]">
      <label
        htmlFor="nickname"
        className="mr-[5px] rounded-[5px] text-center font-bold  min-w-[70px] inline-block"
      >
        닉네임
      </label>
      <input
        required
        placeholder="최소 2~6 이하 영문/한글"
        id="nickname"
        name="nickname"
        className="bg-[transparent] border rounded-[5px] border-gray min-w-[200px] p-[6px] placeholder:text-[gray] focus:bg-[#e2dfdf] focus:outline-none "
        ref={nicknameRef}
        type="text"
        maxLength={6}
        pattern="[ㄱ-ㅎ가-힣a-zA-Z]{2,6}"
        title="최소 2자 이상, 최대 6자 이하의 한글 또는 영문자를 입력하세요."
      />
    </div>
  )
}
