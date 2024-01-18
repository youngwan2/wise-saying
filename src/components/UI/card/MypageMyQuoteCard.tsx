import { ItemsType } from "@/types/items.types"


interface PropsType {
    item: {
        category: string
    } & ItemsType

}
export default function MyQuoteCard({ item }: PropsType) {

    return (
        <>
            <ul key={item.id} className="border shadow-[inset_-3px_-3px_5px_0_rgba(0,0,0,0.5)] p-[10px] rounded-[10px] my-[5px] max-w-[700px] mx-auto hover:bg-gradient-to-r from-white to-gray-200 ">
                <li className="flex">
                    <span className="rounded-[5px] mr-[10px] min-w-50px text-center max-w-[50px] inline-block w-full px-[3px] m-[3px] font-semibold">구분 </span>
                    {item.id}
                </li>
                <li className="flex">
                    <span className=" rounded-[5px] mr-[10px] min-w-50px text-center  max-w-[50px] inline-block  w-full px-[3px] m-[3px] font-semibold">명언  </span>
                    <p>{item.wise_sayings}</p>
                </li>
                <li className="flex">
                    <span className="rounded-[5px] mr-[10px] min-w-50px text-center  max-w-[50px] inline-block  w-full px-[3px] m-[3px] font-semibold">분류  </span>
                    {item.category}
                </li>
            </ul>
        </>)
}