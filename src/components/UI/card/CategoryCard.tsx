import Link from "next/link"
import { HiOutlineCalendarDays, HiOutlineHandThumbUp, HiOutlineHeart, HiOutlineSun, HiOutlineUserGroup } from "react-icons/hi2"

export default function CategoryCard() {

    return (
        <ul className=" h-[700px] max-h-[900px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] m-[8px] flex justify-center items-center text-center flex-wrap overflow-auto">
            {/* 인물별 명언 */}
            <li className=" hover:shadow-[0_0px_0px_3px_tomato] hover:scale-[1.15] transition-all m-2 max-w-[250px] w-full bg-[#fbf7f75a] h-[250px] justify-center text-[1.2em]">
                <Link className="text-[1.25em]" href={'/author-quotes'}><HiOutlineUserGroup color="tomato" className=" w-[100%] h-[180px] mb-[0.5em]" />인물별 명언</Link>{' '}
            </li>
            {/* 날씨 명언 */}
            <li className="hover:shadow-[0_0px_0px_3px_tomato] hover:scale-[1.15] transition-all m-2 max-w-[250px] w-full bg-[#fbf7f75a] h-[250px] justify-center text-[1.2em]">
                <Link className="text-[1.25em]" href={'/weather-quotes'}><HiOutlineSun color="tomato" className="w-[100%] h-[180px] mb-[0.5em]"  />날씨/계절 명언 </Link>
            </li>
            {/* 요일 명언 */}
            <li className="hover:shadow-[0_0px_0px_3px_tomato] hover:scale-[1.15] transition-all m-2  max-w-[250px] w-full bg-[#fbf7f75a] h-[250px] justify-center text-[1.2em]">
                <Link className="text-[1.25em]" href={'/day-quotes'}> <HiOutlineCalendarDays color="tomato" className="w-[100%] h-[180px] mb-[0.5em]"  />요일별 명언 </Link>
            </li>
            {/* 유저 명언 */}
            <li className="hover:shadow-[0_0px_0px_3px_tomato] hover:scale-[1.15] transition-all m-2  max-w-[250px] w-full bg-[#fbf7f75a] h-[250px] justify-center text-[1.2em]">
                <Link className="text-[1.25em]" href={'/user-quotes'}><HiOutlineHandThumbUp color="tomato" className="w-[100%] h-[180px] mb-[0.5em]"  />유저 명언</Link>
            </li>
            {/* 그 외 명언 */}
            <li className="hover:shadow-[0_0px_0px_3px_tomato] hover:scale-[1.15] transition-all m-2 max-w-[250px] w-full bg-[#fbf7f75a] h-[250px] justify-center text-[1.2em]">
                <Link className="text-[1.25em]" href={'/general-quotes'}><HiOutlineHeart color="tomato" className="w-[100%] h-[180px] mb-[0.5em]"  />그 외 명언</Link>
            </li>
        </ul>
    )
}