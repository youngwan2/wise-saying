interface PropsType {
  tapNum: number
  onClickSetTap: (tapIndex: number) => void
}
export default function ForgotTaps({ tapNum, onClickSetTap }: PropsType) {
  return (
    <article className="flex">
      {['이메일 찾기', '비밀번호 찾기'].map((tap, i) => (
        <button
          className={`${tapNum === i ? 'text-white border-[tomato] border-b-[2px]' : 'text-[gray]'} hover:text-[tomato] p-[5px] mx-[5px]  transition-all w-full  `}
          key={tap}
          onClick={() => onClickSetTap(i)}
        >
          {tap}
        </button>
      ))}
    </article>
  )
}
