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
        pt-[4em]
        odd:-rotate-2
        even:rotate-2 
        font-bold
        bg-gradient-to-bl from-white to-[#e0dddd2f]
        text-[1.4em]
        min-h-[230px]  
        max-h-[280px]  
        bg-[white] 
        m-[2.5em] max-w-[300px] min-w-[200px] 
        w-[100%] text-center 
        transition-all
        hover:underline
        hover:decoration-wavy
        hover:decoration-[tomato]
        hover:shadow-[0_10px_5px_0_rgba(0,0,0,0.4)]
        shadow-[1px_10px_5px_0_rgba(0,0,0,0.5)]
        hover:translate-y-[20px]
        hover:bg-[white]
        hover:scale-[1.15]
        hover:z-10
        hover:cursor-pointer
        relative"
    >
      {list.category}요일 <br></br> 명언
      <div className=" w-[20px] h-[45px] bg-[rgba(248,147,147,0.7)] absolute top-[-1em] right-[1em] rotate-[15deg] "></div>
    </li>
  )
}
