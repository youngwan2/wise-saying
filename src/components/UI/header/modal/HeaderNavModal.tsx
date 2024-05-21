'use client'

import { useNavDisplayStateStore } from '@/store/store'
import { useGSAP } from '@gsap/react'

import NavLinkButtonList from '../NavLinkButtonList'

import { HiArrowLeftOnRectangle } from 'react-icons/hi2'

import gsap from 'gsap/all'


export default function HeaderNavModal() {
  const isDisplay = useNavDisplayStateStore((state) => state.isDisplay)
  const setIsDisplay = useNavDisplayStateStore((state) => state.setIsDisplay)

  function onClickClose() {
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
      className={`max-w-[250px] w-full translate-y-[-50%] top-[50%] h-[100vh] fixed bottom-0 z-[100000000000] justify-start flex flex-col
                     overflow-y-auto overflow-x-hidden bg-[#ffffff]
                     transition-all duration-700
          ${isDisplay
          ? 'visible opacity-100 translate-x-0'
          : 'translate-x-[-250px] origin-[left_left] invisible opacity-0'
        } `}
    >
      <button onClick={onClickClose} aria-label='사이드바 닫기 버튼' className='hover:cursor-pointer hover:text-white absolute right-[1em] top-[0.5em] h-[30px] w-[10px] text-[1.5em]'><HiArrowLeftOnRectangle /> </button>
      <NavLinkButtonList/>
    </article>
  )
}



