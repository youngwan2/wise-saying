'use client'

import { pageSwitch, quotesSelector } from "@/utils/commonFunctions"
import { HiArchive, HiScissors } from 'react-icons/hi'
import { useRouter } from "next/navigation"

// import SearchForm from './SearchForm'
interface PropsType {
  items: {
    id: number
    author: string
    wise_sayings: string
  }[]
}
export default function WeatherCard({ items }: PropsType) {
  const router = useRouter()
  return (
    <section className="my-[2em] relative ">
      {/* <SearchForm /> */}
      <ul className="flex justify-center flex-wrap  overflow-y-auto max-h-[80vh] ">
        {items.map((item) => {
          return (
            <li
              className="
                    group
                    p-[3em]
                    odd:-rotate-2 
                    even:rotate-2 
                    min-h-[230px]  
                    max-h-[400px]  
                    bg-[#FFE5A0] 
                    m-3 max-w-[300px] min-w-[200px] 
                    w-[100%] text-center 
                    text-[#242323]
                    transition-all
                    hover:shadow-md
                    hover:translate-y-[-20px]
                    hover:bg-[#fae259]
                    hover:cursor-pointer
                    relative"
              key={item.id}
            >
              <span className='absolute left-2 top-2 rounded-[5em] bg-[white] px-[5px]'>{item.id}</span>
              <blockquote className='mt-[1em]'>
                <li className="w-[20px] h-[45px] bg-[rgba(0,0,0,0.7)] absolute top-[-1em] right-2 "></li>
                <p>{item.wise_sayings}</p>
                <span className='font-bold inline-block mt-[1em]'>{item.author}</span>
              </blockquote>
              <div className='absolute hidden left-0 right-0 top-0 bottom-0 group-hover:flex group-hover:bg-[#00000044] justify-center items-center' aria-label={"버튼 영역 배경"} >
                <button onClick={() => {
                  const id = item.id
                  pageSwitch(router, id)
                  quotesSelector(items, id)
                }} className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.5em]" aria-label='명언 꾸미기 편집화면 이동 버튼' ><HiScissors /></button>
                <button className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.5em]" aria-label='명언 담기 버튼'><HiArchive /></button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
