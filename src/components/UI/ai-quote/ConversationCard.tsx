import styles from './ai.module.css'

import type { MouseEventHandler, ReactEventHandler } from 'react'
import Image from "next/image"

import type { ConversationType } from '@/app/(ai)/ai-quote/page'
import { BiHeadphone } from 'react-icons/bi'


interface PropsType {
  conversation: ConversationType
  onLoadScrollEnd: ReactEventHandler<HTMLElement>
  onSetText: MouseEventHandler<HTMLButtonElement>
  profileImage: string
}

export default function ConversationCard({ onLoadScrollEnd, onSetText, profileImage, conversation }: PropsType) {

  const { created_at, category, role, quote } = conversation
  return (
    <li
      key={created_at}
      suppressHydrationWarning={true}
      onLoad={onLoadScrollEnd}
      className={`${role === 'ai'
        ? ''
        : 'flex-row-reverse '} 
          ${styles.conversation_li} my-[2em] flex text-[0.95em] max-w-[1500px] p-[8px] text-black w-full relative`}
    >
      {/* 프로필 이미지 */}
      <Image
        src={`${role === 'ai' ? '/images/ai-icon.png' : profileImage}`}
        className='h-[35px] w-[35px]'
        width={35}
        height={35}
        alt='ai 아이콘' />
      {/* 말풍선 꼬리 */}
      <div className={`${role === 'ai' ? styles.ai_tail : styles.user_tail}`}></div>

      {/* 말풍선 바디  */}
      <div className={`${role === 'ai' ? 'ml-[10px] bg-[white]' : 'mr-[10px] bg-[#faeb98]'}  min-w-[200px] max-w-[600px] rounded-[30px] p-[10px] relative text-[0.95em] text-[#313131]`} >
        {/* 명언 */}
        {quote.split('').map((split, i) => {
          return (
            <span
              key={i}
              data-testid='quote'
              className='splitText relative' >
              {split}
            </span>)
        })}
        <span className={`${role === 'ai' ? 'right-[8px]' : 'left-[8px]'} 'flex absolute bottom-[-1.65em]`}>
          {/* 명언 분류*/}
          {category !== '' &&
            (<span data-testid='category' className={`mr-[5px] text-black w-[350px] text-[0.85em] bg-[#f0db63] rounded-[8px] px-[5px]`}>
              {category}
            </span>)}
          {/* 생성 일자 */}
          {role === 'ai' &&
            (<span className={`text-[#eae8e867] w-full text-[0.85em]`}>
              {created_at}
            </span>)}
          {/* 듣기 버튼 */}
          {role === 'ai' &&
            (<button
              aria-label='AI 명언 듣기 버튼'
              onClick={onSetText}
              className='text-white  ml-[5px] hover:text-[gold] text-[1.05em]' >
              <BiHeadphone />
            </button>)}
        </span>
      </div>
    </li>
  )
}