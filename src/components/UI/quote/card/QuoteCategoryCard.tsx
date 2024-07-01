'use client'
import styles from '../Quotes.module.css'

import { useRef } from 'react'
import useIntersectionObserver from '@/custom/useIntersectionObserver'

import { hoverAnimation } from '@/utils/common-func'
import Link from 'next/link'

interface PropsType {
  pathname: string
  item: {
    category: string
    job?: string
    birth?: string
  }
}

export default function QuoteCategoryCard({ pathname, item }: PropsType) {
  const liRefs = useRef<HTMLLIElement[]>([])
  const path = `${pathname}/${item.category}`

  useIntersectionObserver(liRefs)

  return (
    <li
      ref={(elemnt) => {
        elemnt && (liRefs.current[liRefs.current.length] = elemnt)
      }}
      onMouseMove={hoverAnimation}
      className={`relative `}

    >
      <Link
        href={path}
        className={`
        ${styles.card}
          inline-block
          py-[3px]
          sm:max-w-[300px]
          min-w-[220px] 
          min-h-[150px]
          max-w-[300px]
          max-h-[200px]  
          hover:translate-y-[-10px]
          hover:z-10
          hover:cursor-pointer
          hover:text-[1.15em]
          hover:border-[rgba(255,255,255,0.25)]
          hover:text-white
          transition-all
          bg-[#ffffff00]
          text-[1.15em]
          p-[0.8em]
          pt-[1em]
          rounded-[5px]
          opacity-80
          border-[1px]
          border-[rgba(255,255,255,0.1)]
          w-[100%] text-center 
          text-[rgba(255,255,255,0.7)]
          `}>
        <span>{item.category} </span>
        {item?.job ? <span className='block mt-[0.5em] text-[0.95em]'>({item.job})</span> : null}
        {item?.birth ? <span className='block mt-[0.5em] text-[0.85em]'>{item.birth}</span> : null}
        {/* 리본 */}
      <div className="w-[20px] h-[45px] bg-[rgba(248,247,247,0.09)] absolute top-[-1em] right-[1em] rotate-[15deg] "></div>
      </Link>
      
    </li>
  )
}
