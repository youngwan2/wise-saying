"use client"

import { useRouter } from 'next/navigation';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

import { toast } from 'react-toastify';

import { addNoticeAction } from '@/actions/notice/add-notice.action';
import { getAccessToken } from '@/utils/session-storage';

// interface PropsType { }
// reference: https://dev.to/sumankalia/how-to-integrate-editorjs-in-reactjs-2l6l


const DEFAULT_INITIAL_DATA = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "여기에 제목을 입력해주세요",
                "level": 1
            }
        },
        {
            "id": "zbGZFPM-iI",
            "type": "paragraph",
            "data": {
                "text": "여기에 공지할 사항을 적어주세요."
            }
        },
    ]
}

const INIT_CATEGORY_NAME = '업데이트'
export default function NoticeEditor() {

    const [post, setPost] = useState<OutputData | undefined>(DEFAULT_INITIAL_DATA)
    const [category, setCategory] = useState(INIT_CATEGORY_NAME)
    const backMove = useRouter().back

    const token = getAccessToken()
    const ejInstance = useRef<EditorJS | null>(); // Editor 인스턴스

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editor.js',
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
            autofocus: true,
            data: post,


        });

    }
    useEffect(() => {
        // 인스턴스가 null 이면 인스턴스 생성
        if (ejInstance.current === null) {
            initEditor()
        }

        // 디마운트 시 에디터 인스턴스를 제거
        return () => {
            ejInstance.current?.destroy()
            ejInstance.current = null
        }
    }, [])

    // 업로드
    async function handleUpload() {
        const response = await addNoticeAction(category, post, token || '')
        const { message, success } = response

        if (success) {
            toast.success(message)
            backMove()
        } else {
            toast.error(message)
        }
    }

    // 카테고리 설정
    function handleSetCategory(e: ChangeEvent<HTMLSelectElement>) {
        setCategory(e.currentTarget.value || '업데이트')
    }

    // 편집창 나가기
    function handleBackMove() {
        const isExit = confirm("나가면 현재 내용이 초기화될 수 있습니다. 정말로 나가시겠습니까?")

        if (isExit) {
            backMove()
        }
    }

    return (
        <form className='p-5 bg-white w-full min-h-[100vh] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[100000000000000000] '>
            <div className='max-w-[595px] mx-auto'>
                <div className='flex justify-between items-center mt-28'>
                    {/* 카테고리 선택 */}
                    <select defaultValue={'업데이트'} onChange={handleSetCategory} >
                        <option value='업데이트'>업데이트</option>
                        <option value='이벤트'>이벤트</option>
                        <option value='점검'>점검</option>
                        <option value='작업'>작업</option>
                        <option value='서비스'>서비스</option>
                    </select>

                    {/* 저장/나가기 */}
                    <div className='flex justify-end'>
                        <button type='button' onClick={handleUpload} className=' border-b border-gray-100 border-[2px] hover:bg-gray-200  w-[80px] mx-1'>등록</button>
                        <button type='button' onClick={handleBackMove} className='bg-gray-200 rounded-sm hover:bg-gray-300 w-[80px] text-center'>나가기</button>
                    </div>
                </div>
                {/* 에디터:  holder 에 입력된 값과 id 가 동일해야 함 */}
                <div className='p-3 mx-auto bg-white w-[100vw] no-tailwind' id='editor.js'></div>
            </div>
        </form>
    )
}