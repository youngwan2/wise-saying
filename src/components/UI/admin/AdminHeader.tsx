import Link from "next/link";

export default function AdminHeader() {
    return (
        <header className="flex justify-between text-white p-[8px] z-[100000000000000000]">
            <h2 className="text-[1.15em] font-bold"><Link href={'/admin'}>Admin</Link></h2>
            <nav>
                <ul className="flex">
                    {/* <li className="px-[1em]"><Link href={'/admin'}>통계</Link> </li> */}
                    <li className="px-[1em]"><Link href={'/admin/quotes-management'}>명언 등록</Link> </li>
                    {/* <li className="px-[1em]"><Link href={'/admin/quotes-management'}>인물정보 등록</Link> </li> */}
                    <li className=" z-[100000000000000000] px-[1em]"><Link href={'/'}>돌아가기</Link> </li>
                </ul>
            </nav>
        </header>
    )
}