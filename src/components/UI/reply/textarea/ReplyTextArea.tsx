import { KeyboardEventHandler, RefObject, TextareaHTMLAttributes } from "react"

interface PropsType extends TextareaHTMLAttributes<HTMLElement> {
    onKeyUp: KeyboardEventHandler<HTMLTextAreaElement>
    ref: RefObject<HTMLTextAreaElement>
}

export default function ReplyTextArea({ onKeyUp, ref, ...props }: PropsType) {
    return (
        <textarea
            ref={ref}
            onKeyUp={onKeyUp}
            {...props}>

        </textarea>
    )
}