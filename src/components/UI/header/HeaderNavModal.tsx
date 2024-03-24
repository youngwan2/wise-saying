'use client'

import navList from '@/router'
import { useNavDisplayStateStore } from '@/store/store'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap/all'
import { usePathname, useRouter } from 'next/navigation'
import React, { MouseEventHandler } from 'react'
import type { IconType } from 'react-icons'
import { HiArrowLeftOnRectangle  } from 'react-icons/hi2'


const CSS_AFTER = `after:content-["현재"] after:bg-[tomato] after:text-white after:rounded-[10px] after:p-[3px] after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[10px] `

interface PropsType {
  onClick: MouseEventHandler<HTMLButtonElement>
  icon: IconType
  label: string
  path: string
  matchPath: (path: string) => boolean
}

export default function HeaderNavModal() {
  const isDisplay = useNavDisplayStateStore((state) => state.isDisplay)
  const setIsDisplay = useNavDisplayStateStore((state) => state.setIsDisplay)
  const router = useRouter()
  const pathSplit = usePathname()


  // 이동 경로 및 현재 경로의 일치유무 따른 판단 함수
  function matchPath(path: string) {
    const result = pathSplit.includes(path)

    return result
  }

  function onClickClose(){
    setIsDisplay(false)
  }


  useGSAP(() => {
    const tl = gsap.timeline();
    if (!isDisplay) return
    const targets = gsap.utils.toArray('#header_nav button') as HTMLButtonElement[]


    targets.forEach((target) => {
      tl.set(target, { transition: "0.6s" })
      tl.fromTo(target, { opacity: 0, x: -1000 }, { opacity: 1, x: 0 }, '-=0.4')
    })

  }, [isDisplay])

  return (
      <article
        aria-hidden={!isDisplay}
        aria-label="네비게이션"
        id='header_nav'
        className={`max-w-[250px] w-full translate-y-[-50%] top-[50%] h-[100vh] fixed bottom-0 z-[10000] justify-start flex flex-col
                     overflow-y-auto overflow-x-hidden bg-[#ffffff]
                     transition-all duration-700
          ${isDisplay
            ? 'visible opacity-100 translate-x-0'
            : 'translate-x-[-250px] origin-[left_left] invisible opacity-0'
          } `}
      >
        <button onClick={onClickClose} aria-label='사이드바 닫기 버튼' className='hover:cursor-pointer hover:text-white absolute right-[1em] top-[0.5em] h-[30px] w-[10px] text-[1.5em]'><HiArrowLeftOnRectangle/> </button>
        <article className='h-[100%] w-[100%]'>
          <h3 className='pl-[1em] py-[13px] mb-[1em] font-bold text-white text-[1.15em] bg-[tomato]'>Wise Sayings</h3>
          {navList.map((navItem, index) => (
            <NavLinkButton
              key={index}
              onClick={() => router.push(navItem.path)}
              icon={navItem.icon}
              label={navItem.label}
              path={navItem.path}
              matchPath={matchPath}
            />
          ))}
        </article>
      </article>
  )
}

// Child : 네비게이션
function NavLinkButton({ onClick, icon, label, path, matchPath }: PropsType) {

  const result = matchPath(path)
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`
      ${result ? CSS_AFTER + 'a border-l-[0.5em] border-[tomato] text-[tomato]' : ''}
      lg:text-[0.75em] first:mt-[6em] text-[0.7em]  hover:bg-[#f2f1f1] py-[12px] min-w-[200px] w-full  hover:text-[tomato] transition-all  px-[5px] font-bold text-[#1f1e1ee4]  hover:cursor-pointer `}
    >
      <span className="text-[1.25em] flex items-center ">
        {icon &&
          React.createElement(icon, {
            color: 'tomato',
            className: 'max-w-[50px] w-full h-[25px] mb-[0.5em]',
          })}
        {label}
      </span>
    </button>
  )
}


