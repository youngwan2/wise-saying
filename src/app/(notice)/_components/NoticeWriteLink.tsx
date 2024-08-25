// interface PropsType { }

import Link from "next/link";


export default function NoticeWriteLink() {
    return (
        <Link href={'/notice/write'} className="text-white hover:text-slate-400 pr-3">
            공지 작성
        </Link>
    )
}