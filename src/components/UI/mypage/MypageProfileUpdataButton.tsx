interface PropsType {
  imgIsLoading: boolean
}
export default function MypageProfileUpdateButton({ imgIsLoading }: PropsType) {
  return (
    <button
      disabled={imgIsLoading}
      aria-label="프로필 정보를 수정"
      className={`
      ${imgIsLoading ? 'bg-[#aaa8a8] cursor-wait' : 'bg-[#e2dfdf]'}
       bg-[transparent]  rounded-[2px] border-gray min-w-[200px] mt-[1.5em] p-[8px] placeholder:text-[gray] bg-[white] focus:outline-none text-black font-bold hover:bg-[#e5e3e3]`}
    >
      {imgIsLoading ? '이미지 업로드 중...' : '변경하기'}
    </button>
  )
}
