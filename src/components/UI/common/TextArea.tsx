import React, { forwardRef, TextareaHTMLAttributes } from 'react';

interface PropsType extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

const TextArea = forwardRef<HTMLTextAreaElement, PropsType>((props, ref) => {
    return (
        <textarea ref={ref} {...props} />
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;
