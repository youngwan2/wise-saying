'use client'
import SearchForm from './SearchForm'
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
      <SearchForm />
      <ul className="flex justify-center flex-wrap  overflow-y-auto  max-h-[500px]  ">
        {items.map((item) => {
          return (
            <li
              className="
                    p-[3em]
                    odd:-rotate-2 
                    even:rotate-2 
                    min-h-[230px]  
                    max-h-[400px]  
                    bg-[#FFE5A0] 
                    m-3 max-w-[300px] min-w-[200px] 
                    w-[100%] text-center 
                    transition-all
                    hover:shadow-md
                    hover:translate-y-[-20px]
                    hover:bg-[#fae259]
                    hover:cursor-pointer
                    relative"
              key={item.id}
            >
              <ul>
                <li className="w-[20px] h-[45px] bg-[rgba(0,0,0,0.7)] absolute top-[-1em] right-2 "></li>

                <li>{item.wise_sayings}</li>
                <li className="pt-[10px]">
                  <strong>{item.author}</strong>
                </li>
              </ul>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
