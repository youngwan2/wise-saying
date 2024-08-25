

import Link from "next/link";


interface PropsType {
    id: number,
    name: string
    title: string
    createdAt: string
}
export default function NoticeListItem({ id, name, title, createdAt }: PropsType) {
    return (
        <li key={id} className='py-4 border-t border-[rgba(255,255,255,0.05)] group'>
            <Link href={`/notice/${id}`} className='flex  text-white justify-between md:flex-row flex-col group-hover:text-slate-400 '>
                <span className='max-w-[110px] w-full px-1' >{id}</span>
                <span className='max-w-[110px] w-full' >{name}</span>
                <h2 className='font-bold text-[1.15rem] w-full'>{title}</h2>
                <span className='min-w-[100px]'>{createdAt}</span>
            </Link>
        </li>
    )
}