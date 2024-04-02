import useTTS from '@/custom/useTTS'
import styles from './ai.module.css'
import Image from 'next/image'
import SyncLoader from 'react-spinners/SyncLoader'
import { UserInfoType, getUserInfo } from '@/utils/session-storage'
import { ConversationType } from '@/app/(quotes)/ai-quote/page'
import { BiHeadphone } from 'react-icons/bi'


interface PropsType {
  isLoading: boolean
  conversationList: ConversationType[]
}
export default function Conversation({ isLoading, conversationList }: PropsType) {
  const { setText } = useTTS()

  const userInfo = getUserInfo() as UserInfoType | null

  function scrollEnd(e: any) {
    const target = e.currentTarget.parentElement
    target?.scrollTo({ top: 100000000000 })
  }

  const profileImage = userInfo ? userInfo.profile.image : '/images/user-icon.png'

  return (
    <article className="mt-[1.5em] bg-[#ffffff08] font-sans">
      <ul className='listWrap w-full  overflow-y-auto  h-[60vh] list-wrap'>
        {conversationList.map((conversation, i) => {
          const { role, quote, category, created_at } = conversation
          return (
            <li suppressHydrationWarning={true} onLoad={scrollEnd} className={`${role === 'ai' ? '' : 'flex-row-reverse '} ${styles.conversation_li} my-[2em] flex text-[0.95em] max-w-[1500px] p-[8px] text-black w-full relative`} key={i}>
              <Image src={`${role === 'ai' ? '/images/ai-icon.png' : profileImage}`} className='h-[35px] w-[35px]' width={35} height={35} alt='ai 아이콘'></Image>
              <div className={`${role === 'ai' ? styles.ai_tail : styles.user_tail}`}></div>
              <p className={`${role === 'ai' ? 'ml-[10px]' : 'mr-[10px] bg-[#faeb98]'} bg-[white] min-w-[200px] max-w-[600px] rounded-[30px] p-[10px] relative text-[0.95em] text-[#313131]`} >{quote.split('').map((split, i) => {
                return (<span className='splitText relative' key={i}>{split}</span>)
              })}
                <span className={`${role === 'ai' ? 'right-[8px]' : 'left-[8px]'} 'flex absolute bottom-[-1.65em]`}>
                  {category !== '' && <span className={`mr-[5px] text-black w-[350px] text-[0.85em] bg-[#f0db63] rounded-[8px] px-[5px]`}>{category}</span>}
                  {role === 'ai' && <span className={`text-[#eae8e867] w-full text-[0.85em]`}>{created_at}</span>}
                  {role === 'ai' && <button onClick={() => setText(quote)} className='text-white  ml-[5px] hover:text-[gold] text-[1.05em]' ><BiHeadphone /> </button>}
                </span>
              </p>
            </li>
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
