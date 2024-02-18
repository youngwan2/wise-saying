
import { forwardRef} from "react"
import { MouseEventHandler, useId } from "react"


interface PropsType {
    isShow:boolean
    action: (formData: FormData) => Promise<void>
    onClickShowReplyForm: MouseEventHandler<HTMLButtonElement>
}

const ReplyForm = forwardRef<HTMLTextAreaElement, PropsType>(function ReplyForm({ action, isShow, onClickShowReplyForm}, ref) {
    const uId = useId()
    return (
        <form className={`${isShow ? 'flex' : 'hidden'} mt-[1em]  flex-col`} action={action}>
            <h2 className='pb-[3px] p-2 inline-block bg-[white] rounded-t-[10px] w-full text-[1.15em]'>
                <b>답글 쓰기</b>
            </h2>

            <textarea
                ref={ref}
                className='focus:outline-none focus:shadow-[inset_0_10000px_0_1px_rgba(0,0,0,0.1)] p-[10px]  min-h-[20px]'
                name="reply-content"
                id={uId + 'reply-content'}>
            </textarea>

            <article className='flex justify-end rounded-b-[10px] bg-white'>
                <button onClick={onClickShowReplyForm} className='hover:shadow-[0_2px_0_0_tomato]  m-[5px] mr-[8px]' type='button'>취소</button>
                <button className='hover:shadow-[0_2px_0_0_tomato] m-[5px] mr-[8px]'>등록</button>
            </article>
        </form>
    )
})

export default ReplyForm

interface PropsType {
    isShow: boolean
    action: (formData: FormData) => Promise<void>
    onClickShowReplyForm: MouseEventHandler<HTMLButtonElement>
}
