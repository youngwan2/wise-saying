'use client'

import QuotesCardButton from "../button/QuotesCardButton"




// import SearchForm from './SearchForm'
interface PropsType {
  items: {
    id: number
    author: string
    wise_sayings: string
  }[]
}
export default function WeatherCard({ items }: PropsType) {

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
              <QuotesCardButton itemId={item.id} items={items} category="날씨"/>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
