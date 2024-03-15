import { ReplyType } from '@/types/items.types'

interface PropsType extends ReplyType {}
export default function ReplyContent({ reply }: PropsType) {
  return (
    <>
      <div className="relative left-[-2em] rounded-full bg-[#edc6c0] min-w-[40px] h-[35px] shadow-lg"></div>
      <div className="relative left-[-1em] font-sans">
        <span className="sm:text-[13px] sm:mt-[0.2em] text-[12px] inline-block pb-[3px]  ">
          {reply.nickname}({reply.email.replace(reply.email.slice(2, 5), '***')}
          ) {reply.created_at.split('T')[0]}
        </span>
        <p className="sm:text-[13px] text-[12px] font-sans">{reply.content}</p>
      </div>
    </>
  )
}
