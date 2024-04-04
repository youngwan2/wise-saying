"use client"
import Link from "next/link";
import { useRef, useState } from "react";


const FooterStyle = ' bg-[transparent] pt-[3em] min-h-[200px] text-[#bebebe] font-sans font-thin mx-auto shadow-[0_-1px_0_white] text-[0.95em]'
export default function Footer() {
    const [isHide, setIsHide] = useState(false)

    const footerRef = useRef<HTMLElement>(null)

    function onClickSetHide() {
        if (footerRef.current) {
            setIsHide(!isHide)
            document.body.scrollTo({ top: 100000000000 })
        }
    }


    return (
        <>
            <button className={`${isHide ? 'text-[1.03em] text-white' : 'text-[1.03em] text-white '} border-t border-x rounded-t-[5px] hover:bg-[#ffffff19] min-w-[100px] p-[3px] ml-[2em] relative left-[50%] translate-x-[-50%] mt-[6em]`} onClick={onClickSetHide}>{isHide ? '푸터 보기' : '푸터 숨기기'}</button>
            <footer ref={footerRef} className={`${isHide ? 'hidden' : 'block'}` + FooterStyle} >
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
                            <li className="hover:shadow-[inset_0_-1px_0_0_white] hover:font-bold"><Link href={'/policy'}>이용약관</Link></li>
                            <li className="hover:shadow-[inset_0_-1px_0_0_white] hover:font-bold"><Link href={'/policy'}>개인정보처리방침</Link></li>
                            <li className="hover:shadow-[inset_0_-1px_0_0_white] hover:font-bold"><Link target="_blank" href={'https://docs.google.com/forms/d/e/1FAIpQLSd2rc8Jf-tewVy7mLJRZ9NnuYiv7GAKX3gAPvH-vZ34AI9QRg/viewform?usp=sf_link'}>불편 및 건의사항 신고</Link></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>

    )
}