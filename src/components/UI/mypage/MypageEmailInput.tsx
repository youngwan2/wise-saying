interface PropsType {
  email: string
}
export default function MypageEmailInput({ email }: PropsType) {
  return (
    <div className="mx-auto my-[1em]">
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
        className="shadow-[0_0_0_2px_white] bg-[transparent]  rounded-[2px] border-gray min-w-[200px] max-w-[250px] w-full p-[6px] placeholder:text-[gray] bg-[#e2dfdf] focus:outline-none text-white hover:cursor-not-allowed "
      ></input>
    </div>
  )
}
