"use client"
import { HiOutlineCalendarDays, HiOutlineHandThumbUp, HiOutlineHeart, HiOutlinePencil, HiOutlineSun, HiOutlineUserGroup } from "react-icons/hi2"
import { useNavDisplayStateStore } from "@/store/store";
import { useRouter } from "next/navigation";

export default function HeaderNavModal() {
    const isDisplay = useNavDisplayStateStore((state) => state.isDisplay)
    const router = useRouter()

    return (
            <article
                aria-label="하단 네비게이션"
                className={`max-w-[900px] left-[50%] translate-x-[-50%] fixed bottom-0 z-50 h-[full] w-[100vw] flex flex-wrap
                     justify-center items-center text-center overflow-hidden bg-[#ffffff]
                     transition-all duration-700
                    shadow-[0_-5px_10px_0_rgba(0,0,0,0.5)]  
                    rounded-t-[1em]
                     ${isDisplay ? 'visible opacity-100 translate-y-0' : 'translate-y-[100px] invisible opacity-0'} `}>
                {/* 인물별 명언 */}
                <button onClick={()=>{
                    router.push('/author-quotes')
                }} className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em] hover:bg-white rounded-[10px]  transition-all m-2 justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <span className="text-[1.25em]"><HiOutlineUserGroup color="tomato" className=" w-[100%] h-[30px] mb-[0.5em]" />인물별 명언</span>
                </button>
                {/* 날씨 명언 */}
                <button onClick={()=>{
                    router.push('/weather-quotes')
                }} className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em] hover:bg-white rounded-[10px] transition-all m-2 max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <span className="text-[1.25em]" ><HiOutlineSun color="tomato" className="w-[100%] h-[30px] mb-[0.5em]" />날씨/계절 명언 </span>
                </button>
                {/* 요일 명언 */}
                <button onClick={()=>{
                    router.push('/day-quotes')
                }} className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em] hover:bg-white rounded-[10px]  transition-all m-2  max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <span className="text-[1.25em]" > <HiOutlineCalendarDays color="tomato" className="w-[100%] h-[30px] mb-[0.5em]" />요일별 명언 </span>
                </button>
                {/* 유저 명언 */}
                <button onClick={()=>{
                    router.push('/user-quotes')
                }} className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em] hover:bg-white rounded-[10px] transition-all m-2  max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <span className="text-[1.25em]" ><HiOutlineHandThumbUp color="tomato" className="w-[100%] h-[30px] mb-[0.5em]" />유저 명언</span>
                </button>
                {/* 그 외 명언 */}
                <button onClick={()=>{
                    router.push('/etc-quotes')
                }} className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em]  hover:bg-white rounded-[10px] transition-all m-2 max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <span className="text-[1.25em]" ><HiOutlineHeart color="tomato" className="w-[100%] h-[30px] mb-[0.5em]" />그 외 명언</span>
                </button>
                {/* 명언등록 */}
                <button onClick={()=>{
                    router.push('/add-wisesaying')
                }} className="hover:shadow-[0_0px_0px_2px_tomato] min-w-[100px] text-[0.68em] lg:text-[0.8em]  hover:bg-white rounded-[10px] transition-all m-2 max-w-[300px] justify-center px-[5px] font-semibold hover:cursor-pointer">
                    <span className="text-[1.25em]" ><HiOutlinePencil color="tomato" className="w-[100%] h-[30px] mb-[0.5em]" />명언 쓰기</span>
                </button>
            </article>
    )
}