"use client"
import { postComment } from "@/api/user/post"
import { useParams, useRouter } from "next/navigation"

export default function CommentForm() {

    const { id } = useParams()
    const router = useRouter()

    function addComment(formData: FormData) {
        const comment = formData.get('comment') || ''
        postComment(comment, id)
        router.refresh()
    }

    return (
        <form action={addComment} className="mt-[1em]">
            <textarea
                className="w-full min-h-[70px] rounded-[10px] p-[10px]"
                name="comment" id="comment"></textarea>
            <div className="flex mt-[10px] justify-end">
                <button className="mr-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] ">등록</button>
                <button className="mx-[5px] bg-[tomato] min-w-[60px] text-white rounded-[10px] " type="reset">취소</button>
            </div>
        </form>
    )
}