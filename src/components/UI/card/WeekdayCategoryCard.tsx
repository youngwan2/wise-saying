'use client'

import { useRouter } from 'next/navigation'

interface PropsType {
  categories: {
    day_group_id: number
    day_name: string
  }[]
}
export default function WeekdayCategory({ categories }: PropsType) {
  const router = useRouter()
  return (
    <ul className="w-full flex justify-center min-h-[100vh] flex-wrap overflow-y-auto mt-[5em]">
      {categories.map((category) => {
        return (
          <li
            key={category.day_group_id}
            onClick={() => {
              router.push(`/day-quotes/${category.day_group_id}`)
            }}
            className=" 
                    p-[3em]
                    odd:-rotate-2 
                    even:rotate-2 
                    max-w-[280px] 
                    max-h-[230px]
                    min-h-[200px]
                    text-[1.25em]
                    text-[#313131]
                    font-semibold
                    bg-[#FFE5A0] 
                    m-[2em] 
                    w-[100%] text-center 
                    rounded-[5%]
                    transition-all
                    hover:shadow-md
                    hover:translate-y-[-20px]
                    hover:bg-[#fae259]
                    hover:cursor-pointer
                    relative"
          >
            {category.day_name}요일 <br></br> 명언
            <div className="w-[20px] h-[45px] bg-[rgba(233,118,118,0.7)] absolute top-[-1em] left-[30%] -rotate-[15deg] "></div>
          </li>
        )
      })}
    </ul>
  )
}
