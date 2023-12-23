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
    <ul className="mt-[3em] w-full flex justify-center min-h-[350px] max-h-[500px] flex-wrap overflow-y-auto">
      {categories.map((category) => {
        return (
          <li
            key={category.day_group_id}
            onClick={() => {
              router.push(`/day/${category.day_group_id}`)
            }}
            className=" 
                    p-[4em]
                    odd:-rotate-2 
                    even:rotate-2 
                    max-w-[200px] 
                    text-[1.5em]
                    bg-[#FFE5A0] 
                    m-3 
                    w-[100%] text-center 
                    transition-all
                    hover:shadow-md
                    hover:translate-y-[-20px]
                    hover:bg-[#fae259]
                    hover:cursor-pointer
                    relative"
          >
            {category.day_name}
            <div className="w-[20px] h-[45px] bg-[rgba(0,0,0,0.7)] absolute top-[-1em] right-2 "></div>
          </li>
        )
      })}
    </ul>
  )
}
