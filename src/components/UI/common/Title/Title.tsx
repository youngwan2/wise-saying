'use client'
interface PropsType {
    title: string,
    current: number,
    total: number
}
export default function Title({ title, current, total }: PropsType) {

    return (
        <h2 className="flex justify-center items-center text-[1.5em] p-[10px] font-sans  text-center text-white max-w-[280px] mx-auto  border-b-[2px] mt-[4em] mb-[3em] ">
            {title} <span className="ml-[4px] bg-white rounded-[10px] px-[5px] text-[0.65em] mt-[0.4em]  text-[#162557]">{current}/{total}</span>
        </h2>
    )
}