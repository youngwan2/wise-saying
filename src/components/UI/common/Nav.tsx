'use client'
import { useLoginStateStore } from '@/store/store'
import Link from 'next/link'
import useHasToken from '@/custom/useHasToken'

import {
  HiUserGroup,
  HiSun,
  HiOutlineCog,
  HiCalendar,
  HiHeart,
  HiOutlineThumbUp,
  HiHome,
  HiPencil,
  HiLogout,
  HiLogin,
  HiOutlineHome,
} from 'react-icons/hi'

export default function Nav() {
  const nextAuthLoginState = useLoginStateStore((state) => state.loginState)
  const generalLoginState = useHasToken()


  const navItems = [
    { icon: <HiOutlineHome />, label: '홈', href: '/' },
    { icon: <HiUserGroup />, label: '인물별 명언', href: '/author-quotes' },
    { icon: <HiSun />, label: '날씨/계절 명언', href: '/weather-quotes' },
    { icon: <HiCalendar />, label: '요일별 명언', href: '/day-quotes' },
    { icon: <HiOutlineThumbUp />, label: '유저 명언', href: '/user-quotes' },
    { icon: <HiHeart />, label: '그 외 명언', href: '/etc-quotes' },
  ];
  
  const aiServiceItems = [
    { icon: <HiHome />, label: '마이페이지', href: '/mypage' },
    { icon: nextAuthLoginState || generalLoginState ? <HiLogout /> : <HiLogin />, label: nextAuthLoginState || generalLoginState ? '로그아웃' : '로그인', href: nextAuthLoginState || generalLoginState ? '/logout' : '/login' },
    { icon: <HiPencil />, label: '명언등록', href: '/add-wisesaying' },
    { icon: <HiOutlineCog />, label: '환경설정', href: '/system' },
  ];


  return (
    <nav className="text-white p-[10px] rounded-l-[10px] min-w-[230px] max-w-[280px] bg-[#f17e61] min-h-[100%] overflow-y-auto hidden lg:block shadow-[inset_1px_1px_5px_0_rgba(955,255,240,1)]">
      <h2 className="font-bold text-[1.25em] mt-[1.25em]">카테고리</h2>
      <ul className="m-[8px]">
        {navItems.map((item, index) => (
          <li key={index} className="mt-5 flex items-center">
            {item.icon}
            <span className="ml-1">
              <Link href={item.href}>{item.label}</Link>
            </span>
          </li>
        ))}
      </ul>
      <br />
      <h2 className="font-bold text-[1.25em]">AI 서비스</h2>
      <br />
      <hr />
      <ul className="m-[8px] mt-[5em]">
        {aiServiceItems.map((item, index) => (
          <li key={index} className="mt-3 flex items-center">
            {item.icon}
            <span className="ml-1">
              <Link href={item.href}>{item.label}</Link>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
