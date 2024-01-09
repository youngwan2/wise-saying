'use client'

import { useRef } from 'react'
import QuotesCardButton from '../button/QuotesCardButton'
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2'
import { useBookmarkStore } from '@/store/store'
import useIntersectionObserver from '@/custom/useIntersectionObserver'
import UserQuotesCardButton from '../button/UserQuotesCardButton'
import { usePathname,} from 'next/navigation'


interface PropsType {
  category: string
  items: {
    id: number
    author: string
    wise_sayings: string

  }[]
}

export default function QuotesCard({ items, category }: PropsType) {
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList)

  const pathName = usePathname()

  const liRefs = useRef<HTMLLIElement[]>([])
  const setLiRefs = (index: number, element: HTMLLIElement | null) => {
    element instanceof HTMLLIElement && (liRefs.current[index] = element)
  }

  // 인터섹션 옵저버 적용하는 커스텀 훅
  useIntersectionObserver(liRefs)

  return (
    <ul className="mt-[3em] w-full flex justify-center max-h-[80vh] flex-wrap overflow-y-auto ">
      {items?.map((item, i) => {
        return (
          <li
            ref={(element) => {
              setLiRefs(i, element)
            }}
            key={item.id}
            className={`group
                shadow-[1px_10px_5px_0_rgba(0,0,0,0.3)]
                p-[2em] odd:-rotate-2  even:rotate-2  max-w-[280px] bg-[#FFE5A0] 
                m-3 w-[100%] text-center transition-all duration-700 hover:shadow-[-1px_20px_10px_0_rgba(0,0,0,0.5)] hover:translate-y-[-20px]
                min-h-[250px]
                hover:cursor-pointer`}
          >
            <span className='absolute left-2 top-2 bg-white px-[8px] rounded-[5em]'>{item.id}</span>
            <blockquote className='mt-[1em]'>
              <p className=' p-[1em]'>{item.wise_sayings}</p>
              <footer className="font-bold mt-[1em]">{item.author}</footer>
            </blockquote>
            <div className="w-[20px] h-[45px] bg-[rgba(247,123,123,0.7)] absolute top-[-1em] right-1 rotate-45"></div>

            {pathName.includes('/user-quotes')
              ? <UserQuotesCardButton item={item} items={items} />
              : <QuotesCardButton itemId={item.id} items={items} category={category} />}

            <span className='text-[1.5em] text-[tomato] absolute bottom-[5px] left-[5px]'><HiOutlineClipboardDocumentCheck /></span>

          </li>
        )
      })}
    </ul>
  )
}
