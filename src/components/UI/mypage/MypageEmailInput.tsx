interface PropsType {
  email: string
}
export default function MypageEmailInput({ email }: PropsType) {
  return (
    <div className="mx-auto my-[1em] cursor-not-allowed">
      <label
        htmlFor="email"
        className=" mb-[8px] rounded-[5px] min-w-[70px] inline-block text-white"
      >
        이메일
      </label>
      <input
        aria-readonly="true"
        aria-label="유저 이메일 정보 표시창"
        readOnly
        value={email}
        id="email"
        className="cursor-not-allowed border-[1px] border-[rgba(255,255,255,0.1)] rounded-[2px] border-gray min-w-[220px] max-w-[400px] w-full p-[6px] placeholder:text-[gray] bg-[#e4e2e235] focus:outline-none text-white  "
      ></input>
    </div>
  )
}
