import useTTS from '@/custom/useTTS'

import SyncLoader from 'react-spinners/SyncLoader'
import ConversationCard from './ConversationCard'

import {type UserInfoType, getUserInfo } from '@/utils/session-storage'
import {type  ConversationType } from '@/app/(ai)/ai-quote/page'


interface PropsType {
  isLoading: boolean
  conversationList: ConversationType[]
}
export default function ConversationList({ isLoading, conversationList }: PropsType) {
  const { setText } = useTTS()

  const userInfo = getUserInfo() as UserInfoType | null

  function onScrollEnd(e: any) {
    const target = e.currentTarget.parentElement
    target?.scrollTo({ top: 100000000000 })
  }

  const profileImage = userInfo ? userInfo.profile?.image || '/images/user-icon.png' : '/images/user-icon.png'

  return (
    <article className="mt-[1.5em] font-sans rounded-[5px]">
      <ul className='listWrap w-full  overflow-y-auto  h-[70vh] list-wrap'>
        {conversationList.map((conversation) => {
          return (
            <ConversationCard
              profileImage={profileImage}
              conversation={conversation}
              onLoadScrollEnd={onScrollEnd}
              onSetText={() => setText(conversation.quote)}
            />
          )
        })}
        <SyncLoader
          className='relative left-[50%] translate-x-[-50%] my-[5em] text-center'
          onAnimationStart={(e) => {
            const target = e.currentTarget.parentElement
            target?.scrollTo({ top: 100000000000 })
          }}
          loading={isLoading} color='white' />
      </ul>
    </article>
  )
}
