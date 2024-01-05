"use client"
import { ItemsType } from "@/types/items.types"
import QuotesCardButton from "../button/QuotesCardButton"

interface PropsType {
  items: ItemsType[]
  category: string
}
export default function EtcCard({ items, category }: PropsType) {

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
          <QuotesCardButton itemId={item.id} items={items} category={decodeURIComponent(category)}/>
        </li>
      })}
    </ul>
  )
}