"use client"
import { ItemsType } from "@/types/items.types"
import { pageSwitch, quotesSelector } from "@/utils/commonFunctions"
import { useRouter } from "next/navigation"
import { HiArchive, HiScissors } from 'react-icons/hi'

interface PropsType {
  items: ItemsType[]
}
export default function EtcCard({ items }: PropsType) {

  const router = useRouter()
  return (
    <ul className="flex justify-center flex-wrap  overflow-y-auto  max-h-[80vh] mt-[2em]">
      {items.map((item) => {
        return <li key={item.id} className="
                group
                p-[3em]
                odd:-rotate-2 
                even:rotate-2 
                min-h-[230px]  
                max-h-[490px]  
                bg-[#FFE5A0] 
                m-3 max-w-[300px] min-w-[200px] 
                w-[100%] text-center 
                text-[#222222]
                transition-all
                hover:shadow-md
                hover:translate-y-[-20px]
                hover:bg-[#fae259]
                hover:cursor-pointer
                relative"
        >

          <blockquote>
            <span className="absolute left-2 top-2 mb-[2em] rounded-[5em] px-[3px] bg-[#ffffff] text-[black]">
              {item.id}
            </span>
            <p className="leading-[2]">{item.wise_sayings}</p>
            <span className="pt-[1em] block font-bold">{item.author}</span>
          </blockquote>
          <div className="w-[20px] h-[45px] bg-[rgba(0,0,0,0.7)] absolute top-[-1em] right-2 "></div>
          <div className='absolute hidden left-0 right-0 top-0 bottom-0 group-hover:flex group-hover:bg-[#00000044] justify-center items-center' aria-label={"버튼 영역 배경"} >
            <button onClick={() => {
              const id = item.id
              pageSwitch(router, id)
              quotesSelector(items, id)
            }} className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.5em]" aria-label='명언 꾸미기 편집화면 이동 버튼' ><HiScissors /></button>
            <button className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.5em]" aria-label='명언 담기 버튼'><HiArchive /></button>
          </div>
        </li>
      })}
    </ul>
  )
}