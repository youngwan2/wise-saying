'use client'

import { Method, defaultConfig } from '@/configs/config.api'
import { defaultFetch } from '@/utils/fetcher'
import { useGSAP } from '@gsap/react'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/all'
import toast from 'react-hot-toast'

import GuideMessage from '@/components/UI/ai-quote/GuideMessage'
import AiQuote from '@/components/UI/ai-quote/AiQuote'
import Form from '@/components/UI/ai-quote/Form'

export default function AiQuotePage() {
  const [aiQuote, setAiQuote] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  gsap.registerPlugin(TextPlugin)

  // GSAP | 사용자 페이지 입장 후 상단 메시지 애니메이션
  function guideMessageRender() {
    const splitText =
      (gsap.utils.toArray('.splitText') as HTMLSpanElement[]) || []
    const tl = gsap.timeline()

    splitText.forEach((text, i) => {
      tl.from(
        text,
        {
          opacity: 0,
          boxShadow: 'inset 0 -10px 0 0 tomato',
          scale: 1.2,
        },
        '-=0.4',
      )
    })
  }

  // GSAP | 인공지능 명언 생성 후 애니메이션
  function aiQuoteRender() {
    if (aiQuote.length < 2) return
    const splitText =
      (gsap.utils.toArray('.aiSplitText') as HTMLSpanElement[]) || ''
    const tl = gsap.timeline()

    splitText.forEach((text, i) => {
      tl.from(
        text,
        {
          opacity: 0,
          scale: 1.5,
          position: 'absolute',
        },
        '-=0.4',
      )
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
    if (prompt.length < 5)
      return toast.error('보다 정확한 명언 생성을 위해 5자 이상 입력해주세요.')
    getAiQuote(prompt)
  }

  async function getAiQuote(prompt: string) {
    if (!textAreaRef.current) return
    setIsLoading(true)
    const config = defaultConfig(Method.POST, prompt)
    const url = '/api/quotes/ai'
    const { success: isSuccess, results } = await defaultFetch(url, config)

    isSuccess && setAiQuote(results.result || '')
    !isSuccess && setAiQuote(results.result || '')

    setIsLoading(false)
    textAreaRef.current.value = ''
  }

  function onClickCancel() {
    const isCancel = confirm('정말 텍스트 작성을 취소하시겠습니까?')
    isCancel && textAreaRef.current && (textAreaRef.current.value = '')
    !isCancel && toast('요청을 취소하였습니다.')
  }

  return (
    <>
      <article className="max-w-[1200px] bg-[#162557] w-full relative left-[50%] translate-x-[-50%] mt-[5em] shadow-[0_0_0_2px_white] p-[1em] rounded-[5px] text-white overflow-auto">
        <AiQuote isLoading={isLoading} aiQuote={aiQuote} />

        {/* 명언 생성 요청 */}
        <Form
          onClickCancel={onClickCancel}
          generateAction={generateAction}
          ref={textAreaRef}
        />
      </article>
    </>
  )
}
