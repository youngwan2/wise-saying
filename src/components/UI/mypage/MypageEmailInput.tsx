interface PropsType {
  email: string
}
export default function MypageEmailInput({ email }: PropsType) {
  return (
    <div className="mx-auto my-[1em]">
      <label
        htmlFor="email"
        className=" mr-[5px] rounded-[5px]  text-center font-bold min-w-[70px] inline-block"
      >
        이메일
      </label>
      <input
        aria-readonly="true"
        aria-label="유저 이메일 정보 표시창"
        readOnly
        value={email}
        id="email"
        className="text-black bg-[#b6b3b3] rounded-[5px]  min-w-[200px]  p-[6px]"
      ></input>
    </div>
  )
}
