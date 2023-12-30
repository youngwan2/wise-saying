"use client"

import type { ItemsType } from '@/types/items.types'
import { useRouter } from 'next/navigation'
import { HiArchive, HiScissors } from 'react-icons/hi'
import { quotesSelector, pageSwitch } from '@/utils/commonFunctions'
export default function AuthorQuotesCard({ items }: { items: ItemsType[] }) {

  const router = useRouter()

  return (
    <section className='mt-[3em]'>
      <ul className="flex justify-center flex-wrap  overflow-y-auto max-h-[80vh]   ">
        {items.map((item) => {
          return (
            <li
              key={item.id}
              className="
              group
                    p-[2em]
                    odd:-rotate-2 
                    even:rotate-2 
                    min-h-[230px]  
                    max-h-[490px]  
                    bg-[#FFE5A0] 
                    m-3 max-w-[300px] min-w-[200px] 
                    w-[100%] text-center 
                    text-[#000000]
                    transition-all
                    hover:shadow-md
                    hover:bg-[#fae259]
                    hover:rotate-0
                    hover:cursor-pointer
                    relative"
            >
               <span className="absolute top-2 left-2 rounded-[5em] bg-[white] p-[3px] px-[6px] mb-[1em] inline-block">{item.id}</span>
              <blockquote className='mt-[1.5em]'>
                <p className="leading-[2]">{item.wise_sayings}</p>
              </blockquote>
              <div className="w-[20px] h-[45px] bg-[#ff3f3f8a] absolute top-[-1em] right-[5px]  rotate-[45deg]"></div>
              <div className='absolute hidden left-0 right-0 top-0 bottom-0 group-hover:flex group-hover:bg-[#00000044] justify-center items-center' aria-label={"버튼 영역 배경"} >
                <button onClick={()=>{
                  const id = item.id
                  pageSwitch(router, id)
                  quotesSelector(items, id)
                }} className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.5em]" aria-label='명언 꾸미기 편집화면 이동 버튼' ><HiScissors/></button>
                <button className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.5em]" aria-label='명언 담기 버튼'><HiArchive/></button>
              </div>
            </li>
          )
        })}
      </ul>
      
    </section>
  )
}
