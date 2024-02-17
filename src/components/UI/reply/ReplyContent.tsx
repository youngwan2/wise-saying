import { ReplyType } from "./ReplyCard";


interface PropsType extends ReplyType {}
export default function ReplyContent({reply}:PropsType) {


    return (
        <>
            <div className='relative left-[-2em] rounded-full bg-[#edc6c0] min-w-[40px] h-[40px] shadow-lg'></div>
            <div className='relative left-[-1em]'>
                <span className="font-semibold inline-block mt-[0.2em] text-[13.5px]">
                    {reply.nickname}({reply.email.replace(reply.email.slice(2, 5), '***')}) {reply.created_at}
                </span>
                <p className='text-[13px] font-sans'>{reply.content}</p>
            </div>
        </>
    )
}