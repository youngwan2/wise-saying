import useFocus from '@/custom/useFocus'
import { useRef } from 'react'

interface PropsType {
  uId: string
}
export default function EmailInput({ uId }: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null)
  useFocus(inputRef)

  return (
    <div className="mb-4">
      <label htmlFor="email " className="hidden">
        이메일 주소
      </label>
      <input
        ref={inputRef}
        type="email"
        id="email"
        name={uId + 'email'}
        className="bg-transparent w-full  p-[0.65em] border rounded-[5px] focus:outline-none text-white focus:bg-white  focus:text-black focus:font-bold shadow-[inset_0_0_0_1px_white] "
        placeholder="이메일 주소를 입력하세요"
        required
      />
    </div>
  )
}
