import { MouseEventHandler, useEffect, useRef } from 'react'
import ReplyFormButtons from './ReplyFormButtons'

interface PropsType {
  isShowEditForm: boolean
  currentContent: string
  updateReplyAction: (formData: FormData) => Promise<void>
  onClickCancelEdit: MouseEventHandler<HTMLButtonElement>
}

export default function ReplyEditForm({
  currentContent,
  updateReplyAction,
  isShowEditForm,
  onClickCancelEdit,
}: PropsType) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (!isShowEditForm) return
    if (textareaRef.current) {
      textareaRef.current.value = currentContent
      textareaRef.current.focus()
    }
  }, [currentContent, isShowEditForm])

  if (!isShowEditForm) return <></>
  return (
    <li className="w-full">
      <form
        action={updateReplyAction}
        className="sm:mt-[1em] mt-[0.5em] p-[0.5em] flex flex-col w-[100%] min-h-[20px] z-30  backdrop-blur-[4px] rounded-[5px] text-white"
      >
        <textarea
          autoComplete="on"
          rows={1}
          placeholder="대댓글 수정"
          className="sm:text-[14px] text-[13px] resize-none overflow-hidden pb-[3px] pl-[0.25em] font-sans border-none  bg-transparent w-full mt-[0.5em] focus:outline-none outline-none transition-all shadow-[inset_0_-1px_0_0_gray] focus:shadow-[inset_0_-2px_0_0_gray] min-h-[10px] placeholder:text-[gray]   "
          onKeyUp={(e) => {
            const isEnter = e.key === 'Enter'
            const target = e.currentTarget

            target.style.minHeight = `auto`
            if (isEnter) {
              target.style.cssText = `
                min-height:${target.scrollHeight}px
              `
            }
          }}
          ref={textareaRef}
          name="comment-reply"
        />
        <ReplyFormButtons onClickCancelEdit={onClickCancelEdit} />
      </form>
    </li>
  )
}
