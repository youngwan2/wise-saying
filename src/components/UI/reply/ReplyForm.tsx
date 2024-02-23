import { TextareaAutoResize } from '@/utils/textarea'
import { forwardRef } from 'react'
import ReplyFormButtons from './ReplyFormButtons'
import { MouseEventHandler, useId } from 'react'

interface PropsType {
  isShow: boolean
  action: (formData: FormData) => Promise<void>
  onClickShowReplyForm: MouseEventHandler<HTMLButtonElement>
}

const ReplyForm = forwardRef<HTMLTextAreaElement, PropsType>(function ReplyForm(
  { action, isShow, onClickShowReplyForm },
  ref,
) {
  const uId = useId()

  return (
    <form
      className={`${isShow ? 'flex' : 'hidden'} mt-[1em]  flex-col`}
      action={action}
    >
      <textarea
        ref={ref}
        rows={1}
        placeholder="대댓글 추가"
        className="sm:text-[14.5px] text-white overflow-hidden pb-[3px] pl-[0.25em] font-sans border-none border-b bg-transparent w-full mt-[0.5em] focus:outline-none border-b-[#6a6666] outline-none transition-all border-2 shadow-[inset_0_-1px_0_0_rgba(443,333,553,0.5)]  focus:shadow-[inset_0_-2px_0_0_rgba(443,333,553,0.5)] min-h-[10px] placeholder:text-[gray]"
        onKeyUp={TextareaAutoResize}
        name="reply-content"
        id={uId + 'reply-content'}
      ></textarea>
      <ReplyFormButtons onClickCancelAdd={onClickShowReplyForm} />
    </form>
  )
})

export default ReplyForm

interface PropsType {
  isShow: boolean
  action: (formData: FormData) => Promise<void>
  onClickShowReplyForm: MouseEventHandler<HTMLButtonElement>
}
