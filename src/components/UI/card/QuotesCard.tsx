'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import QuotesCardButton from '../button/QuotesCardButton'


interface PropsType {
  category: string
  items: {
    id: number
    author: string
    wise_sayings: string
    
  } []
}

export default function QuotesCard({ items, category }: PropsType) {

  gsap.registerPlugin(Draggable)
  const liRefs = useRef<HTMLLIElement[]>([])
  const setLiRefs = (index: number, element: HTMLLIElement | null) => {
    element instanceof HTMLLIElement && (liRefs.current[index] = element)
  }

  useEffect(() => {
    dragAble()
  }, [])

  // 아이템 드래그 이벤트
  const dragAble = () => {
    const lis = liRefs.current
    setTimeout(() => {
      lis.forEach((li) => {
        Draggable.create(li, {
          type: 'rotation',
        })
      })
    }, 2000)
  }


  return (
    <ul className="mt-[3em] w-full flex justify-center max-h-[80vh] flex-wrap overflow-y-auto">
      {items?.map((item, i) => {
        return (
          <li
            ref={(element) => {
              setLiRefs(i, element)
            }}
            key={item.id}
            className=" group
            p-[2em] odd:-rotate-2  even:rotate-2  max-w-[280px] bg-[#FFE5A0] 
            m-3 w-[100%] text-center transition-all hover:shadow-md hover:translate-y-[-20px]
          hover:bg-[#fae259] hover:cursor-pointer relative"
          >
            <span className='absolute left-2 top-2 bg-white px-[8px] rounded-[5em]'>{item.id}</span>
            <blockquote className='mt-[1em]'>
              <p className=' p-[1em]'>{item.wise_sayings}</p>
              <footer className="font-bold mt-[1em]">{item.author}</footer>
            </blockquote>
            <div className="w-[20px] h-[45px] bg-[rgba(247,123,123,0.7)] absolute top-[-1em] right-1 rotate-45"></div>
            <QuotesCardButton itemId={item.id} items={items} category= {category}/>
          </li>
        )
      })}
    </ul>
  )
}
