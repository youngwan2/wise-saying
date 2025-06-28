"use client"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useAdmin from "@/custom/useAdmin";

import Header from "@editorjs/header";
import EditorJS, { OutputData } from '@editorjs/editorjs';
import List from "@editorjs/list";


import { toast } from "react-toastify";
import { getAccessToken } from "@/utils/session-storage";
import { noticeDelete, noticeUpload } from "@/services/notices/notices-client.service";
import { NoticeType } from "../_types/notice.types";



export default function NoticeDetail({ notice }: Pick<NoticeType, 'notice'>) {
    const token = getAccessToken()

    const [isEdit, setIsEdit] = useState(false)
    const [post, setPost] = useState<OutputData | undefined>(notice?.content)
    const [category, setCategory] = useState(notice?.name || '')
    const isAdmin = useAdmin()
    const handleBackMove = useRouter().back

    const ejInstance = useRef<EditorJS | null>(null); // Editor 인스턴스

    // 에디터 초기화
    const initEditor = () => {
        const editor = new EditorJS({
            readOnly: true,
            holder: 'editor',
            minHeight: 150,
            tools: {
                header: Header,
                list: List

            },
            onReady: () => {
                ejInstance.current = editor
            },
            onChange: async (editor) => {
                setPost(await editor.saver.save())
            },
            data: notice?.content,
        });
    }

    useEffect(() => {
        // 인스턴스가 null 이면 인스턴스 생성
        if (!ejInstance.current) {
            initEditor()
        }

        // 디마운트 시 에디터 인스턴스를 제거
        return () => {
            ejInstance.current?.destroy()
            ejInstance.current = null
        }
    }, [])

    async function handleDelete() {
        const { isSuccess, message } = await noticeDelete(token, notice)
        if (isSuccess) {
            toast.success(message)
            handleBackMove()
        } else {
            toast.error(message)
        }
    }

    async function handleUpload() {
        const { isSuccess, message } = await noticeUpload({ category, notice, post, token })

        if (isSuccess) {
            toast.success(message)
            handleBackMove()
        } else {
            toast.error(message)
        }

    }



    // 카테고리 설정
    function handleSetCategory(e: ChangeEvent<HTMLSelectElement>) {
        setCategory(e.currentTarget.value || '업데이트')
    }

    // 편집 기능 온오프
    async function editToggle() {
        if (ejInstance.current) {
            ejInstance.current.readOnly.toggle()
            setIsEdit(old => !old)
        }
    }

    return (
        <form className='p-5 w-full mt-24 flex-1 h-full max-w-[768px] bg-white mx-auto rounded-sm shadow-[15px_15px_5px_rgba(0,0,0,0.3)] '>
            <div className='max-w-[595px] mx-auto'>
                <div className='flex justify-between items-center mt-5'>
                    {/* 카테고리 선택 */}
                    {isEdit
                        ? <select defaultValue={'업데이트'} onChange={handleSetCategory} >
                            <option value='업데이트'>업데이트</option>
                            <option value='이벤트'>이벤트</option>
                            <option value='점검'>점검</option>
                            <option value='작업'>작업</option>
                            <option value='서비스'>서비스</option>
                        </select>
                        : <p className="bg-slate-200 px-6">{notice?.name}</p>
                    }

                    {/* 저장/나가기 */}
                    <div className='flex justify-end'>
                        {isAdmin ? <button type="button" onClick={editToggle} className='border-b border-gray-100  hover:bg-gray-200  w-[80px] mx-1'>{!isEdit ? '수정' : '취소'}</button> : null}
                        {isAdmin && !isEdit ? <button type="button" onClick={handleDelete} className='border-b border-gray-100  hover:bg-gray-200  w-[80px] mx-1'>삭제</button> : null}
                        {isEdit ? <button type='button' onClick={handleUpload} className='border-b border-gray-100  hover:bg-gray-200  w-[80px] mx-1'>수정</button> : null}
                        <button type='button' onClick={handleBackMove} className='bg-gray-200 rounded-sm hover:bg-gray-300 w-[80px] text-center'>나가기</button>
                    </div>
                </div>

                {/* 에디터:  holder 에 입력된 값과 id 가 동일해야 함 */}
                <div className='mx-auto w-[100vw] no-tailwind' id='editor'></div>
                <p className="mt-2 w-full  p-1 pl-2 text-right rounded-md overflow-y-auto">(등록일) {new Date(notice?.created_at || '').toLocaleDateString()}</p>
            </div>
        </form>
    )
}