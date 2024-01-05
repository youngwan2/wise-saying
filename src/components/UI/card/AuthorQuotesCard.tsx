"use client"

import type { ItemsType } from '@/types/items.types'
import QuotesCardButton from '../button/QuotesCardButton'
export default function AuthorQuotesCard({ items }: { items: ItemsType[] }) {

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
            <QuotesCardButton itemId={item.id} items={items} category='저자'/>
            </li>
          )
        })}
      </ul>

    </section>
  )
}
