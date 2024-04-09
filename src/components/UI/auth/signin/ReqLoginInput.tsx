export default function ReqLoginInput({ isLoading }: { isLoading: boolean }) {
  return (
    <input
      aria-label="로그인 요청"
      className="text-[1em] mt-[2em] font-semibold flex items-center max-w-[230px] w-full bg bg-white justify-center mx-auto p-[12px] my-[8px] hover:bg-[#e0e0e0] cursor-pointer hover:font-bold rounded-[5px]"
      type="submit"
      value={isLoading ? '전송중..' : '로그인'}
    />
  )
}
