import UserQuotesCard from "@/components/UI/UserQuotesCard"
import { getItemFromDB } from "@/services/item.services"
import { HiUsers } from "react-icons/hi"

export default async function UserPage() {

  const items = await getItemFromDB('users')
  console.log(items)

  return (
    <section>
      <h2 className="flex items-center text-[1.5em] p-[10px] ">
        <span className="bg-[#ffae00] p-[2.5px] rounded-[5px] mx-[5px] mr-[10px]"><HiUsers /></span> 사용자 명언</h2>
      <UserQuotesCard items={items} />
    </section>
  )
}
