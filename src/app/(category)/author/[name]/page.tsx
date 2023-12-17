export const dynamic = "force-dynamic";
import QuotesCard from "@/components/UI/QuotesCard";
import { getQuotesBy } from "@/services/item.services";
import { HiUserGroup } from "react-icons/hi"
import type { ItemsType } from "@/types/items.types";

export default async function AuthorPage({params}:{params:{name:string}}){
    const pathName = params.name
    const items:ItemsType[] = await getQuotesBy(pathName)
    return (
        <section>
            <h2 className="flex items-center text-[1.5em] p-[5px] "><span className="bg-[gold] p-[1.5px] rounded-[5px] m-[10px]"><HiUserGroup /></span>{items[0].author}의 명언</h2>
            <QuotesCard items={items}/>
        </section>
    )
}