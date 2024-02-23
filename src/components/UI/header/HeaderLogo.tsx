import Link from "next/link";

export default function HeaderLogo(){
    return (
        <h1
            aria-label="홈페이지 로고"
            className="sm:text-[1.25em] text-[1.1em] p-[5px] font-bold text-[transparent] bg-clip-text bg-gradient-to-tr from-white from-50% to-[tomato] to-0%  "
        >
            <Link

                aria-label="홈페이지 로고 이면서 홈 이동 링크"
                href={'/'}
            >
                Wise Sayings
            </Link>
        </h1>
    )
}