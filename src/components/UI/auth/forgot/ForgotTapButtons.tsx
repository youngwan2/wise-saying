interface PropsType {
  tapNum: number
  onClickSetTap: (tapIndex: number) => void
}
export default function ForgotTapButtons({ tapNum, onClickSetTap }: PropsType) {
  return (
    <div className="flex">
      {['이메일 찾기', '비밀번호 찾기'].map((tap, i) => (
        <button
          className={`${tapNum === i ? 'text-white border-[white] border-b-[2px]' : 'text-[gray]'} hover:text-[#d7d4d4] p-[5px] mx-[5px]  transition-all w-full mb-[1.2em]  `}
          key={tap}
          onClick={() => onClickSetTap(i)}
        >
          {tap}
        </button>
      ))}
    </div>
  )
}
