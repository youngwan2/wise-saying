"use client"
import Link from "next/link"
import { HiUserGroup, HiSun, HiOutlineCog, HiCalendar, HiHeart, HiFire, HiOutlineThumbUp, HiHome, HiOutlineUser, HiPencil  } from "react-icons/hi"
export default function Nav(){

    return (
        <nav className="text-white p-[10px] rounded-l-[10px] min-w-[230px] max-w-[280px] bg-[#E76F51] min-h-[100%] overflow-y-auto">
            <h2 className="font-bold text-[1.25em] mt-[1.25em]">카테고리</h2>
            <ul className="m-[8px]">
                <li className="mt-5 flex items-center"><HiUserGroup/><span className="ml-1"> <Link href={'/author'}>인물별 명언</Link>  </span></li>
                <li className="mt-5 flex items-center"><HiSun/ ><span className="ml-1"><Link href={'/weather'}>날씨/계절 </Link></span></li>
                <li className="mt-5 flex items-center"><HiCalendar /><span className="ml-1"><Link href={'/day'}>요일별 </Link></span></li>
                <li className="mt-5 flex items-center"><HiHeart /><span className="ml-1"><Link href={'/feel'}>감성자극</Link></span></li>
                <li className="mt-5 flex items-center"><HiFire /><span className="ml-1"><Link href={'/motivation'}>힘나는 말</Link></span></li>
                <li className="mt-5 flex items-center"><HiOutlineThumbUp /><span className="ml-1"><Link href={'/user'}>유저 명언</Link></span></li>
            </ul>
            <br />
            <h2 className="font-bold text-[1.25em]">AI 서비스</h2>
            <br />
            <hr />
            <ul  className="m-[8px] mt-[5em]">
                <li className="mt-3 flex items-center"><HiHome/><span className="ml-1">마이페이지</span></li>
                <li className="mt-3 flex items-center"><HiOutlineUser/><span className="ml-1">로그인</span></li>
                <li className="mt-3 flex items-center"><HiPencil/><span className="ml-1">명언등록</span></li>
                <li className="mt-3 flex items-center"><HiOutlineCog/><span className="ml-1">환경설정</span></li>
            </ul>
        </nav>
    )
}