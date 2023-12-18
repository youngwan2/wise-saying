'use client'
import { useEffect, useState, useRef } from 'react'
import { HiCalendar } from 'react-icons/hi'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

interface ItemsType {
  id: number
  author: string
  wise_sayings: string
}
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const [items, setItems] = useState<ItemsType[]>()
  const [itemCount] = useState(0)
  const [dayOfWeedList] = useState(['월', '화', '수', '목', '금', '토', '일'])

  const messageLiRef = useRef<HTMLLIElement>(null)
  const liRefs = useRef<HTMLLIElement[]>([])

  const setLiRefs = (index: number, element: HTMLLIElement | null) => {
    element instanceof HTMLLIElement && (liRefs.current[index] = element)
  }

  /** @augments dayOfweed : 요일[1: 월, 2:화, 3:수, 4:목, 5:금, 6:토, 7:일] */
  const getWiseSayingByDay = async (dayOfWeed: string) => {
    const response = await fetch(
      `http://localhost:3000/api/items/days/${dayOfWeed}`,
    )
    const data = await response.json()
    setItems(data)
  }

  useEffect(() => {
    getWiseSayingByDay(id)
  }, [id])

  const dragAble = () => {
    const lis = liRefs.current
    setTimeout(() => {
      lis.forEach((li) => {
        Draggable.create(li, {
          type: 'rotation',
        })
      })
    }, 1000)
  }

  useEffect(() => {
    dragAble()
  }, [])

  return (
    <section>
      <h2 className="text-[1.5em] flex items-center p-5">
        <span className="bg-[#ebbb72] p-[2px] mr-[5px]">
          <HiCalendar color="white" />
        </span>
        {dayOfWeedList[Number(id) - 1]}({items?.length ?? itemCount})
      </h2>

      <ul className="mt-[3em] w-full flex justify-center min-h-[350px] max-h-[500px] flex-wrap overflow-y-auto">
        {items?.map((item, i) => {
          return (
            <li
              ref={(element) => {
                setLiRefs(i, element)
              }}
              key={item.id}
              className=" p-[2em] odd:-rotate-2  even:rotate-2  max-w-[200px] bg-[#FFE5A0] 
                                        m-3 w-[100%] text-center transition-all hover:shadow-md hover:translate-y-[-20px]
                                      hover:bg-[#fae259] hover:cursor-pointer relative"
            >
              <blockquote>
                <p>{item.wise_sayings}</p>
                <footer className="font-bold mt-[1em]">{item.author}</footer>
              </blockquote>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
