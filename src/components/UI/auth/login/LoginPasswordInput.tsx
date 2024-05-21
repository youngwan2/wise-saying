import Label from '../../common/Label'
import Input from '../../common/Input'

import { HiOutlineLockClosed } from 'react-icons/hi2'

export default function LoginPasswordInput() {
  return (
    <div className="flex  mx-[10px]">
      <Label
        className="rounded-s-lg text-[1.1em] text-[white] p-[0.8em] text-center inline-block min-w-[50px]"
        htmlFor="user-password"
      >
        <HiOutlineLockClosed className={'inline-block'} />
      </Label>
      <Input
        autoComplete="on"
        aria-label="비밀번호 입력창"
        placeholder="비밀번호"
        className="pl-[10px]  min-w-[230px] w-[100%] bg-transparent border border-[rgba(255,255,255,0.1)] text-white focus:bg-white focus:outline-none focus:text-black focus:font-bold hover:bg-[rgba(255,255,255,0.1)]"
        type="password"
        id="user-password"
        name="password"
      />
    </div>
  )
}
