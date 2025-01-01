import React, { KeyboardEventHandler, forwardRef, TextareaHTMLAttributes } from 'react';

interface PropsType extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onKeyUp: KeyboardEventHandler<HTMLTextAreaElement>;
  
}

/** ReplyTextArea 컴포넌트 */
const ReplyTextArea = forwardRef<HTMLTextAreaElement, PropsType>(
  ({ onKeyUp, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        onKeyUp={onKeyUp}
        {...props}
      />
    );
  }
);

// displayName 설정 (ESLint 경고 방지)
ReplyTextArea.displayName = 'ReplyTextArea';

export default ReplyTextArea;
