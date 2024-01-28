"use client"
import { postComment } from "@/api/user/post"
import { useParams} from "next/navigation"
import { useRef } from "react"

export default function CommentForm() {

    const { id } = useParams()
    const textareaRef  = useRef<HTMLTextAreaElement>(null)
    async function addComment(formData: FormData) {
        const comment = formData.get('comment') || ''
       const isSuccess =await postComment(comment, id)
        textareaRef.current && (textareaRef.current.value='')

        if(isSuccess) {
            alert('댓글이 등록되었습니다. 잠시 후 갱신 됩니다.')
        }

    }

    return (
        <form action={addComment} className="mt-[1em]">
            <textarea
                ref={textareaRef}
                className="w-full min-h-[70px] rounded-[10px] p-[10px]"
                name="comment" id="comment"></textarea>
            <div className="flex mt-[10px] justify-end">
                <button className="mr-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] ">등록</button>
                <button className="mx-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] " type="reset">취소</button>
            </div>
        </form>
    )
}