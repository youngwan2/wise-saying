import { HiOutlineLockClosed } from 'react-icons/hi2'

export default function LoginPasswordInput() {
  return (
    <article className="flex  mx-[10px]">
      <label
        className="rounded-s-lg bg-[#3F3F3F] text-[white] p-[0.8em] text-center inline-block min-w-[50px]"
        htmlFor="user-password"
      >
        <HiOutlineLockClosed className={'inline-block'} />
      </label>
      <input
        aria-label="비밀번호 입력창"
        className="pl-[5px] rounded-e-lg min-w-[230px]  w-[100%] bg-[#ffffffce]"
        type="password"
        id="user-password"
        name="password"
      />
    </article>
  )
}
