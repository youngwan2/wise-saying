'use client'

import { IoIosLink } from 'react-icons/io'
import { BiLogoFacebook } from 'react-icons/bi'
import { BsTwitterX } from 'react-icons/bs'
import { HiShare } from 'react-icons/hi2'
import { useRef, useState } from 'react'
import { SiNaver } from 'react-icons/si'
import { HiXCircle } from 'react-icons/hi'
import toaster from 'react-hot-toast'
import useDraggable from '@/custom/useDraggable'

export default function ShareButtons() {
  const [isDisplay, setIsDisplay] = useState(false)
  const articleRef = useRef<HTMLElement>(null)

  useDraggable(articleRef, null)

  enum ShareType {
    Facebook = 'F',
    X = 'X',
    Naver = 'N',
  }

  const shareWithSns = (type: ShareType) => {
    const url = window.location.href
    const encodeUrl = encodeURIComponent(url)
    let urlConcat = ''

    const index = Object.values(ShareType).indexOf(type)

    index === 0 &&
      (urlConcat = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeUrl)
    index === 1 &&
      (urlConcat = 'https://twitter.com/intent/tweet?url=' + encodeUrl)
    index === 2 &&
      (urlConcat =
        'https://share.naver.com/web/shareView?url=' +
        encodeUrl +
        '&title=[공유] Wise Sayings')

    window.open(urlConcat, '_blank')
  }

  const shareWithClip = async () => {
    try {
      const url = window.location.href
      await window.navigator.clipboard.writeText(url)
      toaster.success('클립보드에 복사되었습니다. 이용해 주셔서 감사합니다.')
    } catch (error) {
      toaster.error('불편을 드려 죄송합니다. 나중에 다시시도 해주세요.')
      console.error(error)
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setIsDisplay(true)
        }}
        className="hover:bg-[tomato] min-w-[85px] my-[4px] py-[5px] mx-auto rounded-[5px]  flex items-center text-white justify-center"
      >
        <HiShare className="mr-[0.5em]" />
        공유
      </button>
      <article
        ref={articleRef}
        aria-hidden={!isDisplay}
        className={` ${
          isDisplay
            ? 'fixed left-[50%] top-[30%]  translate-x-[-50%] translate-y-[-50%] '
            : 'hidden'
        }  rounded-[10px] items-center justify-center my-[1.5em] py-[0.5em] max-w-[300px] mx-auto w-full px-[1em] bg-[white] min-h-[250px] shadow-[0_0_0_1000px_rgba(0,0,0,0.5)] `}
      >
        <div className="mb-[3em] flex justify-between w-full items-center">
          <h3 className="font-bold text-[1.25em]">공유하기</h3>
          <button
            onClick={() => setIsDisplay(false)}
            aria-label="공유하기 모달창 닫기"
            className=" hover:bg-[tomato] rounded-[10px] hover:text-white p-[5px]"
          >
            <HiXCircle className="text-[1.8em]" />
          </button>
        </div>
        <div className="flex ">
          {/* 페이스북 */}
          <button
            aria-label="페이스북 공유"
            className="hover:bg-[#45454527] rounded-[3px] flex flex-col items-center text-[1em] mx-[0.5em] min-w-[60px] "
            onClick={() => {
              shareWithSns(ShareType.Facebook)
            }}
          >
            <BiLogoFacebook
              className="m-[3px] rounded-[3px] text-[2em] bg-[rgb(65,93,155)]"
              color="white"
            />
            페이스북
          </button>
          {/* X(트위터) */}
          <button
            aria-label="X(구. 트위터) 공유"
            className="hover:bg-[#45454527] rounded-[3px] flex flex-col items-center text-[1em] mx-[0.5em] min-w-[50px] "
            onClick={() => {
              shareWithSns(ShareType.X)
            }}
          >
            <BsTwitterX
              className="m-[3px] bg-black text-[2em] p-[3px] rounded-[3px]"
              color="white"
            />
            X
          </button>
          {/* 네이버 */}
          <button
            aria-label="네이버 공유"
            className="hover:bg-[#45454527] rounded-[3px] flex flex-col items-center text-[1em] mx-[0.5em] min-w-[50px] "
            onClick={() => {
              shareWithSns(ShareType.Naver)
            }}
          >
            <SiNaver
              className="m-[3px] bg-[rgb(0,198,59)] text-[2em] p-[5px] rounded-[3px]"
              color="white"
            />
            네이버
          </button>
          {/* URL 복사 */}
          <button
            aria-label="직접 URL 복사. 해당 URL 을 공유하고자 하는 곳에서 붙여넣기."
            onClick={shareWithClip}
            className="hover:bg-[#45454527] flex-col rounded-[5px] text-[1em] p-[3px] text-black mx-[0.3em] flex items-center"
          >
            <IoIosLink
              color="white"
              className="m-[3px] bg-black text-[2em] p-[3px] rounded-[3px]"
            />
            URL
          </button>
        </div>
      </article>
    </>
  )
}
