import { useCallback, useEffect, useState } from "react";
import MyQuoteCard from "../card/MyQuoteCard";

interface PropsType {
    userQuotes: {
        id: number
        wise_sayings: string
        author: string
        category: string
    }[]
}
export default function MypageMyQuoteList({ userQuotes }: PropsType) {

    const [categories, setCategories] = useState<string[]>(['전체']);

    const categoryCreator = useCallback(() => {
        const tempCategories: string[] = []
        userQuotes?.forEach((item) => {
            tempCategories.push(item.category)
        })
        const dedupeCategories = [...new Set(tempCategories)]
        setCategories(dedupeCategories)
    }, [userQuotes])


    useEffect(() => {
        categoryCreator()
    }, [categoryCreator])

    if (!userQuotes) return <h2 className="border inline-block p-[2em] relative left-[50%] translate-x-[-50%] mt-[8em] text-[1.25em] rounded-[10px] shadow-[5px_10px_10px_0_rgba(0,0,0,0.5)] bg-gradient-to-tr from-orange-50 to-white">추가된 게시글이 없습니다.</h2>
    return (
        <section className="mt-[3em] text-center">
            {categories?.map((category) => {
                return (
                    <button key={category} className="border rounded-[2em] py-[3px] px-[10px] bg-[tomato] text-white m-[3px]">{category}</button>
                )
            })}
            {userQuotes?.map((item) => {
                return <MyQuoteCard key={item.id} item={item} />
            })}
            <button className="border-[2px] p-[6px] mt-[2em] bg-gradient-to-tr from-slate-800 to-slate-400 px-[2em] text-white shadow-[inset_-2px_-2px_3px_rgba(0,0,0,0.5)] rounded-[5px] hover:bg-gradient-to-r">더보기</button>
        </section>
    )
}


