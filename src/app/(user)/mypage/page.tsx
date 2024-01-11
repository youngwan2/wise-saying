"use client"

import MypageContainer from "@/components/UI/container/MypageContainer";
import MypageTaps from "@/components/UI/tap/MypageTaps";
import { HiHome } from "react-icons/hi2";



// interface UserInfoType {
//   user_id:number
//   nickname:string
//   email: string 
//   profile_image: string
// }

export default function Mypage() {

  return (
    <section className="w-full bg-red">
      <h2 className="flex items-center text-[1.5em] p-[10px] ">
        <span className="bg-[#ffae00] p-[1.5px] rounded-[5px] mx-[2px]">
          <HiHome color={'white'} />
        </span>
        마이페이지
        
      </h2>
      <MypageTaps />
      <MypageContainer />
    </section>
  )
}
