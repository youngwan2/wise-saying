'use client'
import useIntersectionObserver from '@/custom/useIntersectionObserver'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import styles from './Quotes.module.css'
import { hoverAnimation } from '@/utils/common-func'

interface PropsType {
  category: string
  item: {
    category: string
    job: string
    birth:string
  }
  i: number
}

export default function QuotesCategoryCard({ category, item, i }: PropsType) {
  const router = useRouter()
  const liRefs = useRef<HTMLLIElement[]>([])

  useIntersectionObserver(liRefs)

  function onTrimAndPush() {
    item.category.replace(' ', '')
    router.push(`/quotes/${category}/${item.category}`)
  }

  return (
    <li
      tabIndex={0}
      ref={(elemnt) => {
        elemnt && (liRefs.current[liRefs.current.length] = elemnt)
      }}
      onKeyUp={(e) => {
        const key = e.key
        if (key !== 'Enter') return
        onTrimAndPush()
      }}
      onMouseMove={hoverAnimation}
      onClick={onTrimAndPush}
      className=
      {`
      ${styles.card}
      
      sm:max-w-[300px]
      max-w-[300px]
      min-w-[220px] 
      hover:translate-y-[-10px]
      hover:z-10
      transition-all
      hover:cursor-pointer
      hover:text-[1.15em]
      hover:border-[rgba(255,255,255,0.25)]
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
      relative
      `}
      
      key={i}
    >
      <span className='py-[3px]'>{item.category} </span>
      {item.job ? <span className='block mt-[0.5em] text-[0.95em]'>({item.job})</span> : null}
      {item.birth ? <span className='block mt-[0.5em] text-[0.85em]'>{item.birth}</span> : null}
      {/* 리본 */}
      <div className="w-[20px] h-[45px] bg-[rgba(248,247,247,0.09)] absolute top-[-1em] right-[1em] rotate-[15deg] "></div>
    </li>
  )
}
