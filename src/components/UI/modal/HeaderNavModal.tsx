'use client'

import {
  HiOutlineCalendarDays,
  HiOutlineHandThumbUp,
  HiOutlineHeart,
  HiOutlineHomeModern,
  HiOutlinePencil,
  HiOutlineUserGroup,
} from 'react-icons/hi2'

import { useNavDisplayStateStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { HiPhotograph } from 'react-icons/hi'
import React, { MouseEventHandler } from 'react'
import { IconType } from 'react-icons'


/**
 * TODO : 반복되는 로직이라면 반복문으로 줄일 수 있는 경우 줄일 필요가 있어 보임.
 */

interface PropsType {
  onClick: MouseEventHandler<HTMLButtonElement>
  icon:IconType
  label: string
}
const NavLinkButton = ({ onClick, icon, label }: PropsType) => {
  return (
    <button
      onClick={onClick}
      className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em] hover:bg-white rounded-[10px] transition-all m-2  max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer"
    >
      <span className="text-[1.25em]">
        {icon && React.createElement(icon, { color: 'tomato', className: 'w-[100%] h-[30px] mb-[0.5em]' })}
        {label}
      </span>
    </button>
  );
};

export default function HeaderNavModal() {
  const isDisplay = useNavDisplayStateStore((state) => state.isDisplay);
  const router = useRouter();

  const navList = [
    { path: '/author-quotes', label: '인물별 명언', icon: HiOutlineUserGroup },
    { path: '/day-quotes', label: '요일별 명언', icon: HiOutlineCalendarDays },
    { path: '/user-quotes', label: '유저 명언', icon: HiOutlineHandThumbUp },
    { path: '/etc-quotes', label: '그 외 명언', icon: HiOutlineHeart },
    { path: '/add-wisesaying', label: '명언 쓰기', icon: HiOutlinePencil },
    { path: '/mypage', label: '마이페이지', icon: HiPhotograph },
    { path: '/', label: '홈', icon: HiOutlineHomeModern },
  ];

  return (
    <article
      aria-label="하단 네비게이션"
      className={`max-w-[950px] left-[50%] translate-x-[-50%] fixed bottom-0 z-50 h-[full] w-[100vw] flex flex-wrap
                     justify-center items-center text-center overflow-hidden bg-[#ffffff]
                     transition-all duration-700
                    shadow-[0_-5px_10px_0_rgba(0,0,0,0.5)]  
                    rounded-t-[1em]
                     ${isDisplay
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
  );
}
