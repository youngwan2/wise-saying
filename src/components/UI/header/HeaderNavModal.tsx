'use client'


import navList from '@/router'
import { useNavDisplayStateStore } from '@/store/store'
import { useRouter } from 'next/navigation'

import React, { MouseEventHandler } from 'react'
import type { IconType } from 'react-icons'

interface PropsType {
  onClick: MouseEventHandler<HTMLButtonElement>
  icon: IconType
  label: string
}

export default function HeaderNavModal() {
  const isDisplay = useNavDisplayStateStore((state) => state.isDisplay)
  const router = useRouter()


  return (
    <article
      aria-hidden={!isDisplay}
      aria-label="하단 네비게이션"
      className={`max-w-[950px] left-[50%] translate-x-[-50%] fixed bottom-0 z-50 h-[full] w-[100vw] flex flex-wrap
                     justify-center items-center text-center overflow-hidden bg-[#ffffff]
                     transition-all duration-700
                    shadow-[0_-5px_10px_0_rgba(0,0,0,0.5)]  
                    rounded-t-[1em]
                     ${
                       isDisplay
                         ? 'visible opacity-100 translate-y-0'
                         : 'translate-y-[100px] invisible opacity-0'
                     } `}
    >
      {navList.map((navItem, index) => (
        <NavLinkButton
          key={index}
          onClick={() => router.push(navItem.path)}
          icon={navItem.icon}
          label={navItem.label}
        />
      ))}
    </article>
  )
}

// Child : 네비게이션
function NavLinkButton({ onClick, icon, label }: PropsType) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em] hover:bg-white rounded-[10px] transition-all m-2  max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer"
    >
      <span className="text-[1.25em]">
        {icon &&
          React.createElement(icon, {
            color: 'tomato',
            className: 'w-[100%] h-[30px] mb-[0.5em]',
          })}
        {label}
      </span>
    </button>
  )
}
