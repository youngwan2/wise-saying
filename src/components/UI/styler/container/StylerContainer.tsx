'use client'

import { ChangeEvent, useState } from 'react'
import { useImageElementStore, useImagesSrcStore } from '@/store/store'

import TextStyler from '../styler/text-styler/TextStyler'
import BackgroundStyler from '../styler/background-styler/BackgorundStyler'
import StylerTaps from '../tap/StylerTaps'
import StylerCarosel from '../carosel/StylerCarosel'
import BackMoveButton from '../../common/button/BackMoveButton'
import HideButton from '../button/HideButton'
import StylerImageUploadForm from '../form/StylerImageUploadForm'

import { imagePreviewReader } from '@/utils/imageloader'

import { toast } from 'react-toastify'
import CanvasContainer from './CanvasContainer'


export default function StylerContainer() {
  const [selecTapNum, setSelectTapNum] = useState(0)
  const [isShowStyler, setIsShowStyler] = useState(false)
  const { imagesSrc, setImagesSrc } = useImagesSrcStore((state) => state)
  const setImageSrc = useImageElementStore((state) => state.setImageSrc)

  function onClickToggleStyler() {
    setIsShowStyler(!isShowStyler)
  }

  function onClickSetBackgroundImage(imageSrc: string) {
    setImageSrc(imageSrc)
  }


  function onClickDeleteBackgroundImage(choiceIndex: number) {
    const isDelete = confirm('정말로 삭제하시겠습니까?')
    if (!isDelete) return toast('삭제요청을 취소하였습니다.')
    const delResult = imagesSrc.filter(src => src !== imagesSrc[choiceIndex])
    setImagesSrc(delResult)
  }

  async function onChangeImageUploader(e: ChangeEvent<HTMLInputElement>) {
    const src = (await imagePreviewReader(e, 'styler')) || ''
    const isValidSrc = src?.length > 5
    isValidSrc && imagesSrc ? setImagesSrc([...imagesSrc, src]) : null
  }


  return (
    <section className="flex flex-col justify-center w-full p-[0.5em] mt-[3.5em]">
      <BackMoveButton />
      {/* 하단/좌측 | 편집기  */}
      <div className={`${!isShowStyler ? '' : 'translate-y-[390px]'}  left-[50%] translate-x-[-50%] min-h-[390px] fixed bottom-[0] backdrop:grayscale-[50%] backdrop-grayscale-[10%] bg-[#162557b6] z-[10000000] p-[0.8em] mt-[2em] w-full flex flex-col max-w-[450px] shadow-[0_0_60px_10px_#162557] transition-transform border-t border-x `}>
        <HideButton onToggle={onClickToggleStyler} isShowStyler={isShowStyler} />
        <StylerTaps selectTapNum={selecTapNum} setSelectTapNum={setSelectTapNum}/>
        <TextStyler selectTapNum={selecTapNum} />
        <BackgroundStyler selectTapNum={selecTapNum} />
        <StylerImageUploadForm  selectTapNum={selecTapNum}  onChangeImageUploader={onChangeImageUploader}  />
      </div>
      
      {/* 상단/우측 | 캔버스, 캐러셀 */}
      <div className="flex flex-col items-center w-full overflow-x-hidden mr-[1em]  rounded-[5px] p-[1em] ">
        <CanvasContainer />
        <StylerCarosel imagesSrc={imagesSrc} onClickSetBackgroundImage={onClickSetBackgroundImage} onClickDeleteBackgroundImage={onClickDeleteBackgroundImage} />
      </div>
    </section>
  )
}
