import { TbHeadphones } from 'react-icons/tb'
import { HiAcademicCap } from 'react-icons/hi2'
import useTTS from '@/custom/useTTS'

interface PropsType {
  isLoading: boolean
  aiQuote: string
}
export default function AiQuote({ isLoading, aiQuote }: PropsType) {
  const { setText } = useTTS()

  return (
    <article className="mt-[1.5em]">
      <h2 className="sm:text-[1.25em] text-[1.05em] mb-[0.5em] flex items-center">
        <HiAcademicCap className="mr-[5px]" /> AI 명언
      </h2>
      {isLoading ? (
        <p className=" bg-white text-black font-semibold text-center p-[2em] sm:text-[1.35em] py-[1.25em] min-h-[110px] animate-pulse">
          생성중...
        </p>
      ) : (
        <p className=" bg-white text-black font-semibold text-center p-[2em] sm:text-[1.35em] text-[1.15em] shadow-[0_0_0_2px_white] h-[150px] rounded-[5px]">
          {aiQuote.split('').map((splitQuote, i) => {
            return (
              <span key={i} className="aiSplitText opacity-100  relative">
                {splitQuote}
              </span>
            )
          })}
        </p>
      )}
      <article className="m-[8px] flex justify-end">
        <button
          onClick={() => {
            aiQuote.length > 2 && setText(aiQuote)
          }}
          className="hover:bg-[tomato] p-[3px] rounded-[5px] flex items-center"
        >
          <TbHeadphones className="mr-[5px]" /> 듣기
        </button>
      </article>
      <p className="text-center pb-[10px]">
        {
          '주의) AI 가 생성한 명언(글귀)의 출처는 부정확할 수 있습니다. 사용 시 주의 부탁드립니다.'
        }
      </p>
    </article>
  )
}
