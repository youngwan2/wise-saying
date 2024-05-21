'use client'

import HomeMenuList from './HomeMenuList'

import { HiMenuAlt3 } from 'react-icons/hi'


export default function HomeMenu() {


  return (
    <>
      <h2 className="sm:text-[1.5em] text-[1.35em] flex items-center text-white max-w-[600px] pl-[8px] mx-auto  mt-[2em] mb-[0.25em]">
        <HiMenuAlt3 className="mr-[5px]" /> 카테고리
      </h2>
      <HomeMenuList />
    </>
  )
}
