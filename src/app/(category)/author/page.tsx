import { getItemFromDB } from "@/services/item.services"
import AuthorsCard from "@/components/UI/AuthorsCard"
import { HiUserGroup } from "react-icons/hi"

export default async function AuthorPage(){

    const items = await getItemFromDB('authors')

    return (
        <section className="">
            <h2 className="flex items-center text-[1.5em] p-[5px] "><span className="bg-[gold] p-[1.5px] rounded-[5px] mx-[2px]"><HiUserGroup /></span>인물별 명언</h2>
            <AuthorsCard items={items}/>
        </section>
    )
}