import useDraggable from '@/custom/useDraggable'
import useHasToken from '@/custom/useHasToken'
import { updateComment } from '@/services/user/patch'
import { MouseEventHandler, useRef } from 'react'

interface PropsType {
  onClickEditCancel: MouseEventHandler<HTMLButtonElement>
  commentId: number
  editFormDisplay: boolean
  setEditFormDisplay: (value: boolean) => void
}
export default function CommentEditForm({
  onClickEditCancel,
  commentId,
  editFormDisplay,
  setEditFormDisplay,
}: PropsType) {
  const hasToken = useHasToken()
  const formRef = useRef<HTMLFormElement>(null)
  useDraggable(formRef, null)

  // PATCH | 유저가 작성한 댓글을 수정하는 요청
  async function commentUpdate(formData: FormData) {
    if (!hasToken) return alert('로그인 해주세요')
    const comment = formData.get('comment')?.valueOf().toString() || ''
    updateComment(commentId, comment).then(() => setEditFormDisplay(false))
  }

  if (!editFormDisplay) return <></>
  return (
    <li>
      <form
        ref={formRef}
        action={commentUpdate}
        className="sm:text-[15px] text-[14.5px] text-white flex flex-col w-full mt-[1em] h-auto backdrop-blur-[4px] rounded-[5px]   p-[10px]"
      >
        <textarea
          rows={1}
          placeholder='댓글 수정'
          name="comment"
          className="h-auto w-full bg-transparent resize-none  p-[10px] border-none shadow-[inset_0_-1px_0_0_gray] focus:shadow-[inset_0_-2px_0_0_gray] focus:outline-none placeholder:text-[gray]"
        />{' '}
        <br />
        <div className="flex  justify-end">
          <button className="mr-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] ">
            수정
          </button>
          <button
            onClick={onClickEditCancel}
            className="mx-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] "
            type="reset"
          >
            취소
          </button>
        </div>
      </form>
    </li>
  )
}
