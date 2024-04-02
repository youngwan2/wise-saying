'use client'

import { Method, defaultConfig } from '@/configs/config.api'
import { defaultFetch } from '@/utils/fetcher'
import { useGSAP } from '@gsap/react'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/all'
import toast from 'react-hot-toast'

import Conversation from '@/components/UI/ai-quote/Conversation'
import Form from '@/components/UI/ai-quote/Form'

export type ConversationType = {
  quote: string,
  role: string,
  category: string,
  created_at?: string
}
const currnetTime = new Date().toLocaleString()
const defaultMessages=[
  {
    quote: '반갑습니다. ai 명언 생성을 담당하는 위대한 AI 라고 합니다. 이용에 앞서 당부드리자면, 제가 만든 명언은 출처가 명확하지 않습니다. 실제 사용 시에는 이를 유념 해주세요. ',
    role: 'ai',
    category: '',
    created_at: currnetTime
  },
  {
    quote: '그리고 제가 생성한 명언은 보다 많은 사람들의 힘이 될 수 있도록 공유될 수 있습니다. ',
    role: 'ai',
    category: '',
    created_at: currnetTime
  },
  {
    quote: '사용법은 아래 프롬프트에도 나와 있듯이, 명언의 재료가 될 수 있는 키워드를 듬뿍 넣어서 입력해주세요. 그러면 맛깔나게 만들어보겠습니다. ',
    role: 'ai',
    category: '',
    created_at: currnetTime
  }
]



export default function AiQuotePage() {
  const [conversationList, setConversationList] = useState<ConversationType[]>(defaultMessages)
  const [isLoading, setIsLoading] = useState(false)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

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
          textShadow:'2px 2px 5px gray',
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


  async function generateAiQuoteBy(prompt: string) {
    const userConversation = {
      quote: prompt,
      category: '',
      role: 'user',
      created_at: currnetTime
    }
    setConversationList([...conversationList, userConversation])

    if (!textAreaRef.current) return
    setIsLoading(true)
    const config = defaultConfig(Method.POST, prompt)
    const url = '/api/quotes/ai'
    const { success: isSuccess, results } = await defaultFetch(url, config)
    const result = results.result || { quote: "", category: "", ai: "ai", create_at: '' }

    setConversationList([...conversationList, userConversation, result])

    if (!isSuccess) return toast.error('요청을 처리하던 중 서버에서 문제가 발생하였습니다. 나중에 다시시도 해주세요.')

    setIsLoading(false)
    textAreaRef.current.value = ''
  }

  // Action | 인공지능 명언 생성
  async function generateAction(form: FormData) {
    const prompt = form.get('prompt')?.valueOf().toString() || ''
    if (prompt.length < 5) return toast.error('보다 정확한 명언 생성을 위해 5자 이상 입력해주세요.')
    generateAiQuoteBy(prompt)
  }


  return (
    <article className="max-w-[1200px] bg-[#162557] w-full relative left-[50%] translate-x-[-50%] mt-[5em] p-[1em] rounded-[5px] text-white overflow-auto">
      <Conversation isLoading={isLoading} conversationList={conversationList} />

      {/* 명언 생성 요청 */}
      <Form
        generateAction={generateAction}
        ref={textAreaRef}
      />
    </article>
  )
}
