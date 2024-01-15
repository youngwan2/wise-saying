"use client"
import { HiOutlineCalendarDays, HiOutlineHandThumbUp, HiOutlineHeart, HiOutlinePencil, HiOutlineSun, HiOutlineUserGroup } from "react-icons/hi2"
import { useNavDisplayStateStore } from "@/store/store";
import Link from "next/link";

export default function HeaderNavModal() {
    const isDisplay = useNavDisplayStateStore((state) => state.isDisplay)

    return (
        <nav className="" >
            <ul
                className={`max-w-[900px] left-[50%] translate-x-[-50%] fixed bottom-0 z-50 h-[full] w-[100vw] flex flex-wrap
                     justify-center items-center text-center overflow-hidden bg-[#ffffff]
                     transition-all duration-700
                    shadow-[0_-5px_10px_0_rgba(0,0,0,0.5)]  
                    rounded-t-[1em]
                     ${isDisplay ? 'visible opacity-100 translate-y-0' : 'translate-y-[100px] invisible opacity-0'} `}>
                {/* 인물별 명언 */}
                <li className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em] hover:bg-white rounded-[10px]  transition-all m-2 justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <Link className="text-[1.25em]" href={'/author-quotes'}><HiOutlineUserGroup color="tomato" className=" w-[100%] h-[30px] mb-[0.5em]" />인물별 명언</Link>{' '}
                </li>
                {/* 날씨 명언 */}
                <li className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em] hover:bg-white rounded-[10px] transition-all m-2 max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <Link className="text-[1.25em]" href={'/weather-quotes'}><HiOutlineSun color="tomato" className="w-[100%] h-[30px] mb-[0.5em]" />날씨/계절 명언 </Link>
                </li>
                {/* 요일 명언 */}
                <li className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em] hover:bg-white rounded-[10px]  transition-all m-2  max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <Link className="text-[1.25em]" href={'/day-quotes'}> <HiOutlineCalendarDays color="tomato" className="w-[100%] h-[30px] mb-[0.5em]" />요일별 명언 </Link>
                </li>
                {/* 유저 명언 */}
                <li className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em] hover:bg-white rounded-[10px] transition-all m-2  max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <Link className="text-[1.25em]" href={'/user-quotes'}><HiOutlineHandThumbUp color="tomato" className="w-[100%] h-[30px] mb-[0.5em]" />유저 명언</Link>
                </li>
                {/* 그 외 명언 */}
                <li className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em]  hover:bg-white rounded-[10px] transition-all m-2 max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <Link className="text-[1.25em]" href={'/general-quotes'}><HiOutlineHeart color="tomato" className="w-[100%] h-[30px] mb-[0.5em]" />그 외 명언</Link>
                </li>
                {/* 명언등록 */}
                <li className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em]  hover:bg-white rounded-[10px] transition-all m-2 max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <Link className="text-[1.25em]" href={'/add-wisesaying'}><HiOutlinePencil color="tomato" className="w-[100%] h-[30px] mb-[0.5em]" />명언 쓰기</Link>
                </li>
            </ul>
        </nav>
    )
}