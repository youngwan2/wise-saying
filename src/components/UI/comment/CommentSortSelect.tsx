import { onSubmit } from "@/utils/commonFunctions"
import { ChangeEvent, useEffect, useRef } from "react"

interface PropsType {
    setSort: (value: string) => void
}
export default function CommentSortSelect({ setSort }: PropsType) {

    const inputRef = useRef<HTMLInputElement>(null)
    function onChangeSort(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value
        setSort(value)
        e.currentTarget.checked = true
    }

    useEffect(() => {
        if (inputRef.current) inputRef.current.checked = true
    }, [])

    return (
        <form className="flex mt-[2em] justify-end" onSubmit={onSubmit}>
            <div className="mx-[5px]">
                <input id="recent" type="radio" value='DESC' name="sort" onChange={onChangeSort} ref={inputRef} />
                <label className="text-white mx-[5px]" htmlFor="recent">최근 순</label>
            </div>
            <div className="mx-[5px]" onChange={() => {

            }}>
                <input id="old" type="radio" value='ASC' name="sort" onChange={onChangeSort} />
                <label className="text-white mx-[5px]" htmlFor="old">오래된 순</label>
            </div>
        </form>
    )

}