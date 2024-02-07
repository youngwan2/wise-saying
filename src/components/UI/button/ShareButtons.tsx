'use client'

import { IoIosLink } from "react-icons/io";
import { BiLogoFacebook } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { HiShare } from "react-icons/hi2";
import { useState } from "react";
import { SiNaver } from "react-icons/si";
export default function ShareButtons() {

    const [isDisplay, setIsDisplay] = useState(false)

    enum ShareType {
        Facebook = 'f',
        X = 'x',
        Naver = 'n'
    }

    const shareWithSns = (type: ShareType) => {
        const url = window.location.href
        const encodeUrl = encodeURIComponent(url)
        let urlConcat = ''

        switch (type) {
            case ShareType.Facebook: {
                urlConcat = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeUrl
                break
            }
            case ShareType.X: {
                urlConcat = 'https://twitter.com/intent/tweet?url=' + encodeUrl
                break
            }
            case ShareType.Naver: {
                urlConcat = 'https://share.naver.com/web/shareView?url=' + encodeUrl + "&title=" + '[공유] Wise Sayings '
            }
        }
        window.open(urlConcat, '_blank')
    }

    const shareClip = async () => {
        if (!window) return
        try {
            const url = window.location.href
            await window.navigator.clipboard.writeText(url)
            alert('클립보드에 복사되었습니다. 이용해 주셔서 감사합니다.')
        } catch (error) {
            alert('불편을 드려 죄송합니다. 나중에 다시시도 해주세요.')
            console.error(error)
        }
    }

    return (
        <>
            <button onClick={() => {
                setIsDisplay(true)
            }} className="hover:bg-[tomato] min-w-[85px] my-[4px] py-[5px] mx-auto rounded-[5px]  flex items-center text-white justify-center"><HiShare className='mr-[0.5em]' />공유</button>
            <article aria-hidden={!isDisplay} className={` ${isDisplay ? 'flex fixed left-[50%] top-[30%]  translate-x-[-50%] translate-y-[-50%] ' : 'hidden'}  rounded-[10px] flex items-center justify-center my-[1.5em] py-[0.5em] max-w-[300px] mx-auto w-full px-[2em] bg-[white] min-h-[250px] shadow-[0_0_0_1000px_rgba(0,0,0,0.5)] `}>
                <h3 className="fixed top-[0.78em] font-bold text-[1.25em]">공유하기</h3>
                <button
                    onClick={()=>setIsDisplay(false)}
                    aria-label="공유하기 모달창 닫기" className="fixed right-2 top-3 hover:bg-[tomato] hover:text-white p-[5px]">닫기</button>
                {/* 페이스북 */}
                <button
                    aria-label="페이스북 공유"
                    className="hover:shadow-[0_0_0_2px_] rounded-[3px] flex flex-col items-center text-[1em] mx-[0.5em] min-w-[60px] "
                    onClick={() => {
                        shareWithSns(ShareType.Facebook)
                    }}><BiLogoFacebook className='m-[3px] rounded-[3px] text-[2em] bg-[rgb(65,93,155)]' color='white' />페이스북</button>
                {/* X(트위터) */}
                <button
                    aria-label="X(구. 트위터) 공유"
                    className="hover:shadow-[0_0_0_2px_] rounded-[3px] flex flex-col items-center text-[1em] mx-[0.5em] min-w-[50px] "
                    onClick={() => {
                        shareWithSns(ShareType.X)
                    }}><BsTwitterX className='m-[3px] bg-black text-[2em] p-[3px] rounded-[3px]' color='white' />X</button>
                {/* 네이버 */}
                <button
                    aria-label="네이버 공유"
                    className="hover:shadow-[0_0_0_2px_] rounded-[3px] flex flex-col items-center text-[1em] mx-[0.5em] min-w-[50px] "
                    onClick={() => {
                        shareWithSns(ShareType.Naver)
                    }}><SiNaver className='m-[3px] bg-[rgb(0,198,59)] text-[2em] p-[5px] rounded-[3px]' color='white' />네이버</button>
                {/* URL 복사 */}
                <button
                    aria-label="직접 URL 복사. 해당 URL 을 공유하고자 하는 곳에서 붙여넣기."
                    onClick={shareClip} className="hover:shadow-[0_0_0_2px_] flex-col rounded-[5px] text-[1em] p-[3px] text-black mx-[0.3em] flex items-center"><IoIosLink color='white' className='m-[3px] bg-black text-[2em] p-[3px] rounded-[3px]' />URL</button>
            </article>
        </>

    )
}