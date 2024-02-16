import { MouseEventHandler, useState } from "react"
import { HiDotsVertical, HiOutlineX } from "react-icons/hi"
import ReplyEditDeleteMenu from "./ReplyEditDeleteMenu"
import ReplyEditForm from "./ReplyEditForm"
import { getAccessToken } from "@/utils/sessionStorage"

interface PropsType {
    commentId:number
    userEmail: string
    reply: {
        id: number,
        content: string,
        nickname: string,
        email: string,
        created_at: string
    }
}

export default function ReplyCard({ commentId, userEmail, reply }: PropsType) {
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [isShowEditForm, setIsShowEditForm] = useState(false)
    function onClickShowEditForm() { setIsShowEditForm(!isShowEditForm); setIsShowMenu(false) }

    // 대댓글 삭제
    async function deleteReply() {
        const token = getAccessToken() || ''
        const url = `/api/quotes/0/comments/reply?comment-id=${ commentId}&reply-id=${reply.id}` 
        const config = {
            method: 'DELETE',
            headers: {
                authorization: 'Bearer ' + token
            }
        }
        try {
            const response = await fetch(url, config)
            const result = await response.json()
        }
        catch (error) {
            console.error('DELETE 대댓글 삭제 요청 실패:', error)
        }
    }

    // 대댓글 수정
    async function updateReply(replyId:number, content:string){
        const token = getAccessToken() || ''
        const url = `/api/quotes/0/comments/reply?reply=${replyId}`

        const config = {
            method:'PATCH',
            headers : {
                authorization:'Bearer '+token
            },
            body: JSON.stringify(content)
        }
        try {
            const response = await fetch(url, config)
            const result = await response.json()
            console.log(result)

        } catch(error){
            console.error('PATCH 대댓글 수정 요청 실패:', error)
        }

    }


    async function updateReplyAtion(formData:FormData){
        const content = formData.get('content')?.valueOf().toString()||''
        const replyId = reply.id
         await updateReply(replyId, content)
    }

    function onClickShowMenu() { setIsShowMenu(!isShowMenu) }

    return (
        <>
            <li key={reply.id} className='flex w-[90%] bg-white my-[0.2em] rounded-[10px] p-[10px] items-center relative'>
                <div className='relative left-[-2em] rounded-full bg-[#edc6c0] w-[40px] h-[40px]'></div>
                <div className='relative left-[-1em]'>
                    <span className="font-semibold inline-block mt-[0.2em] text-[13.5px]">
                        {reply.nickname}({reply.email.replace(reply.email.slice(2, 5), '***')}) {reply.created_at.split('T')[0]}
                    </span>
                    <p className='text-[13px] font-sans'>{reply.content}</p>
                </div>
                <ReplyMenuDropdownButton isShow={isShowMenu} onClick={onClickShowMenu} />
                {userEmail !== reply.email
                    ? null
                    : isShowMenu
                        ? <ReplyEditDeleteMenu onClickDeleteReply={deleteReply} onClickShowEditForm={onClickShowEditForm} />
                        : null
                }

            </li>
            <li className="w-full">
                <ReplyEditForm currentContent={reply.content} isShowEditForm={isShowEditForm} updateReplyAction={updateReplyAtion} onClickCancelEdit={onClickShowEditForm} />
            </li>
        </>
    )
}

interface MenuButtonPropsType {
    isShow: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
}

function ReplyMenuDropdownButton({ isShow, onClick }: MenuButtonPropsType) {
    return (
        <button
            onClick={onClick}
            className="absolute right-[5px] top-[0.5em]  hover:shadow-[0_0_0_1px_tomato] rounded-[50%] p-[5px]"
        >
            {isShow ? <HiOutlineX /> : <HiDotsVertical />}{' '}
        </button>
    )

}