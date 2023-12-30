import { useQuotesLineHeightStore } from "@/store/store";
import { HiPaintBrush } from "react-icons/hi2";

export default function QuotesTextLineHeightStyler() {
    const setLineHeight = useQuotesLineHeightStore((state) => state.setLineHeight)
    return (
        <article>
            <h2 className="flex items-center text-[1.2em] mt-[1.25em] pb-[0.25em] text-[white]"><HiPaintBrush color="white" /> <p className="ml-[0.5em]">글자 줄간격</p></h2>
            <input className="p-[0.2em] max-w-[50%] w-full" type="number" placeholder="Defalut : 35" onChange={(e) => {
                const height = Number(e.currentTarget.value)
                setLineHeight(height)
            }} />
        </article>
    )
}