
import { useRouter } from "next/navigation"
import { HiArchive, HiScissors } from 'react-icons/hi'
import { postBookmarkItem, pageSwitch, quotesSelector } from "@/utils/commonFunctions"
import { ItemsType } from "@/types/items.types"
import useHasToken from "@/custom/useHasToken"

interface PropsType {
    itemId: number,
    items: ItemsType[]
    category: string

}

export default function QuotesCardButton({ itemId, items, category }: PropsType) {
    const router = useRouter()
    const hasToken = useHasToken();

    return (
        <article className='absolute hidden left-0 right-0 top-0 bottom-0 group-hover:flex group-hover:bg-[#00000044] justify-center items-center' aria-label={"버튼 영역 배경"} >
            <button onClick={() => {
                const id = itemId
                pageSwitch(router, id)
                quotesSelector(items, id)
            }} className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.5em]" aria-label='명언 꾸미기 편집화면 이동 버튼' ><HiScissors /></button>
            <button onClick={() => {
                postBookmarkItem(hasToken, itemId, items, category)
                router.refresh()
            }} className="p-[5px] hover:bg-[tomato] text-[2em] hover:text-[white] bg-[white] rounded-[0.3em] mx-[0.5em]" aria-label='명언 담기 버튼'><HiArchive /></button>
        </article>

    )
}