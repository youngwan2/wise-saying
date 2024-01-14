export const dynamic = 'force-dynamic'
import { HiUsers } from "react-icons/hi2";
import { getItemFromDB } from "@/services/item.get"
import { ItemsType } from "@/types/items.types";
import QuotesCard from "@/components/UI/card/QuotesCard";
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: '사용자 명언 | My wise saying',
  description: "사용자가 직접 작성한 명언을 모아둔 페이지 입니다."
}


export default async function UserPage() {

  const items: ItemsType[] = await getItemFromDB('users')
  const itemCount = items.length || 0

  return (
    <>
      <h2 className="flex items-center text-[1.5em] p-[10px] ">
        <span className="bg-[#ffae00] p-[2.5px] rounded-[5px] mx-[5px] mr-[10px]"><HiUsers /></span> 사용자 명언({itemCount})</h2>
      <QuotesCard items={items} category="유저" />
    </>
  )
}

