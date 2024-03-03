"use client"

import { Method, defaultConfig } from "@/configs/config.api"
import { defaultFetch } from "@/utils/fetcher"
import { useGSAP } from "@gsap/react"
import { useState, useRef, useEffect } from 'react'
import gsap from "gsap"
import { TextPlugin } from "gsap/all"
import { HiPencilSquare } from "react-icons/hi2"
import toast from "react-hot-toast"
import ReplaceMessageCard from "@/components/UI/common/ReplaceMessageCard"

import GuideMessage from "@/components/UI/ai-quote/GuideMessage"
import AiQuote from "@/components/UI/ai-quote/AiQuote"
import Form from "@/components/UI/ai-quote/Form"



export default function AiQuotePage() {

    const [aiQuote, setAiQuote] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    gsap.registerPlugin(TextPlugin)

    // GSAP | 사용자 페이지 입장 후 상단 메시지 애니메이션
    function guideMessageRender() {
        const splitText = gsap.utils.toArray('.splitText') as HTMLSpanElement[] || []
        const tl = gsap.timeline()

        splitText.forEach((text, i) => {
            tl.from(text, {
                opacity: 0,
                boxShadow: 'inset 0 -10px 0 0 tomato',
                scale: 1.2,
            }, '-=0.4')
        })
    }

    // GSAP | 인공지능 명언 생성 후 애니메이션
    function aiQuoteRender() {
        if (aiQuote.length < 2) return
        const splitText = gsap.utils.toArray('.aiSplitText') as HTMLSpanElement[] || ''
        const tl = gsap.timeline()

        splitText.forEach((text, i) => {
            tl.from(text, {
                opacity: 0,
                scale: 1.5,
                position: 'absolute',
            }, '-=0.4')
        })
    }

    useGSAP(() => {
        guideMessageRender()
    }, [])

    useGSAP(() => {
        aiQuoteRender()
    }, [aiQuote])

    useEffect(() => {
        if (!textAreaRef.current) return
        textAreaRef.current.focus()
    }, [])


    // Action | 인공지능 명언 생성 
    async function generateAction(form: FormData) {
        const prompt = form.get('prompt')?.valueOf().toString() || ''
        getAiQuote(prompt)
    }

    async function getAiQuote(prompt: string) {
        setIsLoading(true)
        const config = defaultConfig(Method.POST, prompt)
        const url = '/api/quotes/ai'
        const { success: isSuccess, results } = await defaultFetch(url, config)

        if (isSuccess) {
            setAiQuote(results.result || '')
            setIsError(false)
        }
        if (!isSuccess) { setIsError(true) }
        setIsLoading(false)

        if (!textAreaRef.current) return
        textAreaRef.current.value = ''
    }

    function onClickCancel() {
        const isCancel = confirm('정말 텍스트 작성을 취소하시겠습니까?')
        isCancel && textAreaRef.current && (textAreaRef.current.value = '')
        !isCancel && toast.success('요청을 취소하였습니다.')
    }

    if (isError) return <ReplaceMessageCard childern='현재 서비스 이용이 불가능 합니다. 나중에 다시시도 해주세요.' />
    return (
        <>
            <article className="max-w-[700px] w-full fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] shadow-[0_0_0_2px_white] p-[1em] rounded-[5px] text-white">
                <GuideMessage />

                <AiQuote isLoading={isLoading} aiQuote={aiQuote} />

                {/* 명언 생성 요청 */}
                <Form onClickCancel={onClickCancel} generateAction={generateAction} ref={textAreaRef}/>

            </article>
        </>

    )
}