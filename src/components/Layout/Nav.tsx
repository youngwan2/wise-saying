'use client'
import useLoginStateStore from '@/store/store'
import Link from 'next/link'
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
} from 'react-icons/hi'
export default function Nav() {

  const loginState = useLoginStateStore((state) => state.loginState)

  return (
    <nav className="text-white p-[10px] rounded-l-[10px] min-w-[230px] max-w-[280px] bg-[#E76F51] min-h-[100%] overflow-y-auto">
      <h2 className="font-bold text-[1.25em] mt-[1.25em]">카테고리</h2>
      <ul className="m-[8px]">
        {/* 인물별 명언 */}
        <li className="mt-5 flex items-center">
          <HiUserGroup />
          <span className="ml-1">
            {' '}
            <Link href={'/author'}>인물별 명언</Link>{' '}
          </span>
        </li>
        {/* 날씨 명언 */}
        <li className="mt-5 flex items-center">
          <HiSun />
          <span className="ml-1">
            <Link href={'/weather'}>날씨/계절 명언 </Link>
          </span>
        </li>
        {/* 요일 명언 */}
        <li className="mt-5 flex items-center">
          <HiCalendar />
          <span className="ml-1">
            <Link href={'/day'}>요일별 명언 </Link>
          </span>
        </li>
        {/* 유저 명언 */}
        <li className="mt-5 flex items-center">
          <HiOutlineThumbUp />
          <span className="ml-1">
            <Link href={'/user'}>유저 명언</Link>
          </span>
        </li>
        {/* 그 외 명언 */}
        <li className="mt-5 flex items-center">
          <HiHeart />
          <span className="ml-1">
            <Link href={'/general'}>그 외 명언</Link>
          </span>
        </li>
      </ul>
      <br />
      <h2 className="font-bold text-[1.25em]">AI 서비스</h2>
      <br />
      <hr />

      <ul className="m-[8px] mt-[5em]">
        {/* 마이페이지 */}
        <li className="mt-3 flex items-center">
          <HiHome />
          <span className="ml-1">
            <Link href={'/mypage'}>마이페이지</Link>
          </span>
        </li>
        {loginState ? 
        // 로그아웃
        <li className="mt-3 flex items-center">
          <HiLogout />
          <span className="ml-1">
            <Link href={'/logout'}>로그아웃</Link>
          </span>
        </li> 
        : 
        // 로그인
        <li className="mt-3 flex items-center">
          <HiLogin />
          <span className="ml-1">
            <Link href={'/login'}>로그인</Link>
          </span>
        </li>}

        {/* 글쓰기 */}
        <li className="mt-3 flex items-center">
          <HiPencil />
          <span className="ml-1">
            <Link href={'/add-wisesaying'}>명언등록</Link>
          </span>
        </li>
        {/* 환경설정 */}
        <li className="mt-3 flex items-center">
          <HiOutlineCog />
          <span className="ml-1">
            <Link href={'/general'}>환경설정</Link>
          </span>
        </li>
      </ul>
    </nav>
  )
}
