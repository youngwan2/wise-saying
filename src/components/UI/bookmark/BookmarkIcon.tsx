"use client"

import { HiOutlineBookmark } from 'react-icons/hi2'
import { useBookmarkStore } from '@/store/store'


export default function BookmarkIcon() {

    const toggleState = useBookmarkStore((state)=> state.toggleState)
    const count = useBookmarkStore((state)=> state.count)
    const setToggleState = useBookmarkStore((state)=> state.setToggleState)
    return (
        <article onClick={() => {
            setToggleState(!toggleState)
        }} className='text-black fixed  right-[10px] top-[10px] p-[10px] hover:cursor-pointer hover:shadow-[0_0px_0px_1px_rgba(0,0,0,0.3)]'>
            <span className=' rounded-[1em] flex flex-col items-center '>
                <span className='bg-[#fe7c7c] px-[10px] rounded-[1em] mb-[-15px] text-white'>{count}</span>
                <HiOutlineBookmark className={"text-[25px] z-[-1]"} />
            </span>
        </article>
    )
}