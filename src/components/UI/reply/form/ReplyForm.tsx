import { forwardRef, MouseEventHandler, useId } from 'react';

import { textareaAutoResize } from '@/utils/textarea';
import ReplyFormButtons from '../button/ReplyFormButtons';
import ReplyTextArea from '../textarea/ReplyTextArea';

interface PropsType {
  isShow: boolean;
  action: (formData: FormData) => Promise<void>;
  onClickShowReplyForm: MouseEventHandler<HTMLButtonElement>;
}

const ReplyForm = forwardRef<HTMLTextAreaElement, PropsType>(
  ({ isShow, action, onClickShowReplyForm }: PropsType, ref) => {
    const uId = useId();

    return (
      <form
        className={`${isShow ? 'flex' : 'hidden'} mt-[1em] flex-col`}
        action={action}
      >
        <ReplyTextArea
          ref={ref}
          rows={1}
          placeholder="대댓글 추가"
          className="sm:text-[14.5px] text-white overflow-hidden pb-[3px] pl-[0.25em] font-sans border-none border-b bg-transparent w-full mt-[0.5em] focus:outline-none border-b-[#6a6666] outline-none transition-all border-2 shadow-[inset_0_-1px_0_0_rgba(443,333,553,0.5)]  focus:shadow-[inset_0_-2px_0_0_rgba(443,333,553,0.5)] min-h-[10px] placeholder:text-[gray]"
          onKeyUp={textareaAutoResize}
          name="reply-content"
          id={uId + 'reply-content'}
        />
        <ReplyFormButtons onClickCancelAdd={onClickShowReplyForm} />
      </form>
    );
  }
);

// forwardRef로 감쌀 경우 컴포넌트의 displayName을 설정하는 것이 좋습니다.
ReplyForm.displayName = 'ReplyForm';

export default ReplyForm;
