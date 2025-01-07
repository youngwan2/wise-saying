import {
    forwardRef,
    KeyboardEventHandler,
    TextareaHTMLAttributes,
  } from 'react';
  
  interface PropsType extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    onKeyUp: KeyboardEventHandler<HTMLTextAreaElement>;
  }
  
  const ReplyTextArea = forwardRef<HTMLTextAreaElement, PropsType>(
    ({ onKeyUp, ...props }: PropsType, ref) => {
      return (
        <textarea
          ref={ref}
          onKeyUp={onKeyUp}
          {...props}
        />
      );
    }
  );
  
  // forwardRef로 감쌀 경우 displayName을 설정하는 것이 좋습니다.
  ReplyTextArea.displayName = 'ReplyTextArea';
  
  export default ReplyTextArea;
  