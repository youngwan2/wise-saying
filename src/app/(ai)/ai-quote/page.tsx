'use client'

import { useGSAP } from '@gsap/react'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/all'
import toast from 'react-hot-toast'

import Conversation from '@/components/UI/ai-quote/ConversationList'
import Form from '@/components/UI/ai-quote/Form'
import { generateAiQuoteBy } from '@/services/ai.service'
import { currentTime, defaultMessages } from '@/const/ai.const'

export type ConversationType = {
  quote: string,
  role: string,
  category: string,
  created_at?: string
}




export default function AiQuotePage() {
  const [conversationList, setConversationList] = useState<ConversationType[]>(defaultMessages)
  const [isLoading, setIsLoading] = useState(false)


  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  gsap.registerPlugin(TextPlugin)

  // GSAP | 인공지능 명언 생성 후 애니메이션
  function aiQuoteRender() {
    if (conversationList.length < 2) return
    const splitText = (gsap.utils.toArray('.listWrap li:last-child .splitText') as HTMLSpanElement[]) || ''
    const tl = gsap.timeline()

    splitText.forEach((text, i) => {
      tl.from(
        text,
        {
          opacity: 0,
          textShadow: '2px 2px 5px gray',
          scale: 1.5,
        },
        '-=0.4',
      )
    })
  }

  useGSAP(() => {
    aiQuoteRender()
  }, [conversationList])

  useEffect(() => {
    if (!textAreaRef.current) return
    textAreaRef.current.focus()
  }, [])



  // Action | AI 명언 생성
  async function generateAction(form: FormData): Promise<any> {
    const prompt = form.get('prompt')?.valueOf().toString() || ''
    if (prompt.length < 5) return toast.error('보다 정확한 명언 생성을 위해 5자 이상 입력해주세요.')
    setIsLoading(true)

    const userConversation = {
      quote: prompt,
      category: '',
      role: 'user',
      created_at: currentTime
    }
    setConversationList([...conversationList, userConversation])

    if (!textAreaRef.current) return
    const { result, isSuccess } = await generateAiQuoteBy(prompt)

    setConversationList([...conversationList, userConversation, result])
    if (!isSuccess) return toast.error('요청을 처리하던 중 서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.')
    setIsLoading(false)
    textAreaRef.current.value = ''
  }


  return (
    <article className="max-w-[1200px]  w-full relative left-[50%] translate-x-[-50%] mt-[5em] p-[1em] rounded-[5px] text-white overflow-auto ">
      <Conversation isLoading={isLoading} conversationList={conversationList} />

      {/* 명언 생성 요청 */}
      <Form
        generateAction={generateAction}
        textAreaRef={textAreaRef}
      />
    </article>
  )
}
