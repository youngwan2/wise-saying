import styles from '../Quotes.module.css'

import { useRouter } from 'next/navigation'
import { KeyboardEvent } from 'react'

import { hoverAnimation } from '@/utils/common-func'


interface PropsType {
  category: string
}
export default function UserQuotesCategoryCard({ category }: PropsType) {
  const router = useRouter()

  function handleRedirectKey(e: KeyboardEvent<HTMLLIElement>) {
    const key = e.key
    if (key !== 'Enter') return
    router.push(`/user-quotes/${category}`)
  }

  function handleRedirectClick() {
    router.push(`/user-quotes/${category}`)
  }

  return (
    <li
      tabIndex={0}
      key={category}
      onKeyUp={handleRedirectKey}
      onClick={handleRedirectClick}
      onMouseMove={hoverAnimation}
      className=
      {`
      ${styles.card}
      
      sm:max-w-[300px]
      max-w-[300px]
      min-w-[220px] 
      hover:translate-y-[-10px]
      hover:z-10
      m-[5px]
      transition-all
      hover:cursor-pointer
      hover:border-[rgba(255,255,255,0.25)]
      hover:text-[1.2em]
      bg-[#ffffff00]
      text-[1.15em]
      p-[0.8em]
      pt-[1em]
      min-h-[150px]
      rounded-[5px]
      opacity-80
      border-[1px]
      border-[rgba(255,255,255,0.1)]
      max-h-[200px]  
      w-[100%] text-center 
      hover:text-white
      text-[rgba(255,255,255,0.7)]
      relative`}
    >
      {category} <br></br>
      <div className=" w-[20px] h-[45px] bg-[rgba(248,247,247,0.09)] absolute top-[-1em] right-[1em] rotate-[15deg] "></div>
    </li>
  )
}
