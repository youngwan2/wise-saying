
import { ItemsType } from "@/types/items.types"
import QuotesCardCommonButton from "./QuotesCardCommonButton"

export interface PropsType {
    itemId: number,
    items: ItemsType[]
    index: number | 0

}

export default function QuotesCardButton({index, itemId, items }: PropsType) {
    return (
        <article 
        aria-label="꾸미기,담기, 확대, 듣기 버튼의 컨테이너"
        className='group absolute hidden left-0 right-0 top-0 bottom-0 group-hover:flex group-hover:bg-[#00000044] group-hover:backdrop-blur-[1.5px] justify-center items-center flex-wrap flex-col' >
            <QuotesCardCommonButton itemId={itemId} items={items} index={index}/>
        </article>

    )
}