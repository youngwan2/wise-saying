import { MouseEventHandler, useEffect, useRef } from "react"

interface PropsType {
    isShowEditForm: boolean
    currentContent: string
    updateReplyAction: (formData: FormData) => Promise<void>
    onClickCancelEdit: MouseEventHandler<HTMLButtonElement>
}

export default function ReplyEditForm({ currentContent, updateReplyAction, isShowEditForm, onClickCancelEdit }: PropsType) {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        if (!isShowEditForm) return
            if (textareaRef.current) {
                textareaRef.current.value = currentContent
            }
        
    }, [currentContent, isShowEditForm])

    if (!isShowEditForm) return <></>
    return (
        <form
            action={updateReplyAction}
            className="flex flex-col w-[100%] mt-[1em]  min-h-[200px] bg-[#fdfdfd] z-30  backdrop-blur-[4px] rounded-[5px] shadow-[0_0_20px_5px_rgba(0,0,0,0.5)]"
        >
            <div className="absolute w-[90%] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] flex flex-col  ">
                <h2 className="text-[1.25em] my-[5px] font-semibold">대댓글 수정</h2>
                <textarea
                    ref={textareaRef}
                    name="comment-reply"
                    className="bg-[white] w-full max-w-[600px]  max-h-[200px]  rounded-[5px] p-[10px] border-[2px] border-black"
                />{' '}
                <br />
                <div className="flex mt-[10px] justify-end">
                    <button className="mr-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] ">
                        수정
                    </button>
                    <button
                        onClick={onClickCancelEdit}
                        className="mx-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] "
                        type="reset"
                    >
                        취소
                    </button>
                </div>
            </div>
        </form>
    )
}