"use client"
import Link from "next/link"
import { useState } from "react";
import { HiOutlineCalendarDays, HiOutlineHandThumbUp, HiOutlineHeart, HiOutlineSun, HiOutlineUserGroup } from "react-icons/hi2"
import CategoryCloseButton from "../button/CategoryCardCloseButton";


export default function CategoryCard() {

    const [toggleDisplay, setToggleDisplay] = useState(true)
    return (
        <>
        <CategoryCloseButton toggleDisplay={toggleDisplay} setToggleDisplay={setToggleDisplay}/>
        <ul className={`${toggleDisplay? 'visible opacity-100 scale-100':'invisible opacity-0 scale-0'} h-[full] max-w-[1100px] mx-auto mt-[7em]  m-[8px] flex justify-center items-center text-center flex-wrap overflow-auto`}>
            {/* 인물별 명언 */}
            <li className=" hover:shadow-[0_0px_0px_3px_tomato] hover:bg-white rounded-[10px]  shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] transition-all m-2 max-w-[300px] w-full bg-[#fbf7f75a] h-[200px] justify-center text-[1.2em]">
                <Link className="text-[1.25em]" href={'/author-quotes'}><HiOutlineUserGroup color="tomato" className=" w-[100%] h-[140px] mb-[0.5em]" />인물별 명언</Link>{' '}
            </li>
            {/* 날씨 명언 */}
            <li className="hover:shadow-[0_0px_0px_3px_tomato] hover:bg-white rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] transition-all m-2 max-w-[300px] w-full bg-[#fbf7f75a] h-[200px] justify-center text-[1.2em]">
                <Link className="text-[1.25em]" href={'/weather-quotes'}><HiOutlineSun color="tomato" className="w-[100%] h-[140px] mb-[0.5em]"  />날씨/계절 명언 </Link>
            </li>
            {/* 요일 명언 */}
            <li className="hover:shadow-[0_0px_0px_3px_tomato] hover:bg-white rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)]  transition-all m-2  max-w-[300px] w-full bg-[#fbf7f75a] h-[200px] justify-center text-[1.2em]">
                <Link className="text-[1.25em]" href={'/day-quotes'}> <HiOutlineCalendarDays color="tomato" className="w-[100%] h-[140px] mb-[0.5em]"  />요일별 명언 </Link>
            </li>
            {/* 유저 명언 */}
            <li className="hover:shadow-[0_0px_0px_3px_tomato] hover:bg-white rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] transition-all m-2  max-w-[300px] w-full bg-[#fbf7f75a] h-[200px] justify-center text-[1.2em]">
                <Link className="text-[1.25em]" href={'/user-quotes'}><HiOutlineHandThumbUp color="tomato" className="w-[100%] h-[140px] mb-[0.5em]"  />유저 명언</Link>
            </li>
            {/* 그 외 명언 */}
            <li className="hover:shadow-[0_0px_0px_3px_tomato]  hover:bg-white rounded-[10px] shadow-[inset_-2px_-2px_5px_0_rgba(0,0,0,0.5)] transition-all m-2 max-w-[300px] w-full bg-[#fbf7f75a] h-[200px] justify-center text-[1.2em]">
                <Link className="text-[1.25em]" href={'/general-quotes'}><HiOutlineHeart color="tomato" className="w-[100%] h-[140px] mb-[0.5em]"  />그 외 명언</Link>
            </li>
        </ul>
        </>
    )
}