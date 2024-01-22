'use client'

import { WeekDayCategoryType } from '@/types/items.types'
import { useRouter } from 'next/navigation'

interface PropsType {
  list: WeekDayCategoryType
}
export default function WeekdayCategoryCard({ list }: PropsType) {
  const router = useRouter()
  return (
    <li
      tabIndex={0}
      key={list.category_id}
      onKeyUp={(e) => {
        const key = e.key
        if (key !== 'Enter') return
        router.push(`/day-quotes/${list.category_id}`)
      }}
      onClick={() => {
        router.push(`/day-quotes/${list.category_id}`)
      }}
      className="
        p-[4em]
        pt-[3em]
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
    >
      {list.category}요일 <br></br> 명언
     
    </li>
  )
}
