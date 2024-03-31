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
      onClick={onTrimAndPush}
      className="
      sm:max-w-[280px]
      max-w-[250px]
       min-w-[200px] 
      hover:border-t-[white]
      border-t-[0.3em]
      hover:translate-y-[-20px]
      hover:shadow-[inset_5px_10px_5px_300px_rgba(255,255,255,0.2)]
      hover:z-10
      hover:cursor-pointer
      bg-[#ffffff00]
      text-[1.15em]
      p-[0.8em]
      pt-[1em]
      min-h-[150px]
      rounded-[5%]
      border-t-[#ffffff95]
      opacity-80
      border-[2px]
      max-h-[80px]  

      w-[100%] text-center 
      transition-all
      text-white
      shadow-[inset_0_0_0_300px_rgba(0,0,0,0.1)]
      relative"
      key={i}
    >
      <strong>{item.category} </strong>
      <hr />
      {item.job ? <span className='inline-block mt-[1.2em]'>[{item.job}]</span> : null}
    </li>
  )
}
