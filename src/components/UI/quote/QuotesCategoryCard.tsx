'use client'
import useIntersectionObserver from '@/custom/useIntersectionObserver'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

interface PropsType {
  category: string
  item: {
    category: string
    job: string
  }
  i: number
}

export default function QuotesCategoryCard({ category, item, i }: PropsType) {
  const router = useRouter()
  const liRefs = useRef<HTMLLIElement[]>([])

  useIntersectionObserver(liRefs)

  return (
    <li
      ref={(elemnt) => {
        elemnt && (liRefs.current[liRefs.current.length] = elemnt)
      }}
      tabIndex={0}
      onKeyUp={(e) => {
        const key = e.key
        if (key !== 'Enter') return
        item.category.replace(' ', '')
        router.push(`/quotes/${category}/${item.category}`)
      }}
      onClick={() => {
        item.category.replace(' ', '')
        router.push(`/quotes/${category}/${item.category}`)
      }}
      className="
          p-[1em]
          py-[4em]
          odd:-rotate-2 
          even:rotate-2 
          font-bold
          bg-gradient-to-bl from-white to-[#e0dddd2f]
          text-[1.4em]
          min-h-[230px]  
          opacity-80
          border-[8px]
          rounded-[20%]
          max-h-[280px]  
          bg-[white] 
          m-[1em] max-w-[300px] min-w-[200px] 
          w-[100%] text-center 
          transition-all
          shadow-[5px_10px_5px_0_rgba(0,0,0,0.5)]
          hover:underline
          hover:decoration-wavy
          decoration-[tomato]
          hover:border-[tomato]
          hover:translate-y-[-20px]
          hover:bg-[white]
          hover:z-10
          hover:cursor-pointer
          hover:shadow-[0_10px_5px_0_rgba(0,0,0,0.4)]
          relative"
      key={i}
    >
      {item.category} <br />
      {item.job ? <span>[{item.job}]</span> : null}
    </li>
  )
}
