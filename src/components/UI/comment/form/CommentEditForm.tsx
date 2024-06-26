import { MouseEventHandler, useRef } from 'react'
import useHasToken from '@/custom/useHasToken'
import { useCommentUpdate } from '@/store/store'

import ControlButton from '../../common/button/ControlButton'
import TextArea from '../../common/TextArea'
import ButtonContainer from '../../common/container/ButtonContainer'

import { updateComment } from '@/services/user/patch'

import { toast } from 'react-toastify'

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

  const setIsUpdateComment = useCommentUpdate((state) => state.setIsUpdate)

  // PATCH | 유저가 작성한 댓글을 수정하는 요청
  async function commentUpdateAction(formData: FormData) {
    if (!hasToken) return toast.error('로그인 후 이용 가능합니다.')
    const comment = formData.get('comment')?.valueOf().toString() || ''
    updateComment(commentId, comment).then(() => setEditFormDisplay(false))
    setIsUpdateComment(true)
  }

  if (!editFormDisplay) return <></>
  return (
    <li>
      <form
        ref={formRef}
        action={commentUpdateAction}
        className="sm:text-[15px] text-[14.5px] text-white flex flex-col w-full mt-[1em] h-auto backdrop-blur-[4px] rounded-[5px]   p-[10px]"
      >
        <TextArea
          rows={1}
          placeholder="댓글 수정"
          name="comment"
          className="h-auto w-full bg-transparent resize-none  p-[10px] border-none shadow-[inset_0_-1px_0_0_gray] focus:shadow-[inset_0_-2px_0_0_gray] focus:outline-none placeholder:text-[gray]" />
        <br />
        <ButtonContainer elementName='div' className="flex  justify-end">
          <ControlButton ariaLabel='수정 버튼' className="mr-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] ">
            수정
          </ControlButton>
          <ControlButton
            ariaLabel='취소 버튼'
            onClick={onClickEditCancel}
            className="mx-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] "
            type="reset">
            취소
          </ControlButton>
        </ButtonContainer>
      </form>
    </li>
  )
}
