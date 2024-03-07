import { HiOutlineLockClosed } from 'react-icons/hi2'

export default function LoginPasswordInput() {
  return (
    <article className="flex  mx-[10px]">
      <label
        className="rounded-s-lg text-[1.1em] text-[white] p-[0.8em] text-center inline-block min-w-[50px]"
        htmlFor="user-password"
      >
        <HiOutlineLockClosed className={'inline-block'} />
      </label>
      <input
        autoComplete="on"
        aria-label="비밀번호 입력창"
        placeholder="비밀번호"
        className="pl-[10px] min-w-[230px] w-[100%] bg-transparent shadow-[inset_0_0_0_2px_white] text-white focus:bg-white focus:outline-none focus:text-black focus:font-bold"
        type="password"
        id="user-password"
        name="password"
      />
    </article>
  )
}
