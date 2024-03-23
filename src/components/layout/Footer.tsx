import Link from "next/link";

export default function Footer() {


    return (
        <footer className="bg-[transparent] mt-[5em] pt-[3em] min-h-[200px] text-[#bebebe] font-sans font-thin mx-auto shadow-[0_-3px_5px_rgba(0,0,0,0.5)] text-[0.95em]" >
            <div className="max-w-[1300px] flex justify-around mx-auto px-[4em]">
                <div className="min-w-[130px]">
                    <h5 className="w-[20%] font-bold">Wise Sayings</h5>
                    <div className="mt-[10px] text-[0.95em]">ⓒ 2024 <span>위대한말</span></div>
                </div>
                <div className="sm:w-[50%] sm:flex-row sm:items-start flex items-center w-[90%] flex-col">
                    <ul className="sm:w-[50%] w-[100%]" >
                        <li>대표자명: <span>김영완</span></li>
                        <li>이메일: <span>qodna25@gmail.com</span></li>
                    </ul>
                    <ul className="sm:w-[30%] sm:ml-[4em] sm:mt-[0] w-[100%] ml-[0] mt-[10px]">
                        <li className="hover:shadow-[inset_0_-1px_0_0_white] hover:font-bold"><Link href={'#'}>이용약관</Link></li>
                        <li className="hover:shadow-[inset_0_-1px_0_0_white] hover:font-bold"><Link href={'#'}>개인정보처리방침</Link></li>
                        <li className="hover:shadow-[inset_0_-1px_0_0_white] hover:font-bold"><Link target="_blank" href={'https://docs.google.com/forms/d/e/1FAIpQLSd2rc8Jf-tewVy7mLJRZ9NnuYiv7GAKX3gAPvH-vZ34AI9QRg/viewform?usp=sf_link'}>불편 및 건의사항 신고</Link></li>
                    </ul>
                </div>
            </div>
        </footer>

    )
}