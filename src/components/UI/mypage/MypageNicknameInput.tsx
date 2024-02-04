import { useEffect, useRef } from "react"


interface PropsType {
    nickname:string
}
export default function MypageNicknameInput({nickname}:PropsType){

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
          ref={nicknameRef}
          type="text"
          id="nickname"
          name='nickname'
          className="bg-[transparent] shadow-[inset_0_-2px_0_0_black] min-w-[200px] p-[6px]"
        />
      </div>
    )
}