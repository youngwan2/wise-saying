import { AlignState, BgColorState, CardSizeState, ImageElState, ImageSrcType, StorkeState, TextOptionState, TextStyleState } from '@/types/store.type'
import { create } from 'zustand'

const defaultImagsSrc = [
  '/images/image0.png',
  '/images/image1.png',
  '/images/image2.png',
  '/images/image3.png',
  '/images/image4.png',
  '/images/image5.png',
  '/images/image6.png',
  '/images/image7.png',
  '/images/image8.png',
  '/images/image9.png',
  '/images/image10.png',
  '/images/image11.png',
  '/images/image12.png',
  '/images/image13.png',
  '/images/image14.png',
  '/images/image15.png',
  '/images/image16.png',
  '/images/image17.png',
  '/images/image18.png',
  '/images/image19.png',
  '/images/image20.png',
  '/images/image21.png',
  '/images/image22.png',
  '/images/image23.png',
]



/** 유저가 선택한 배경 색을 저장 */
export const useBackgroundColorStore = create<BgColorState>((set) => ({
  bgColor: 'white',
  setBgColor: (bg) => set(() => ({ bgColor: bg })),
}))

/** 명언 편집기의 카드 사이즈 저장 */
export const useQuotesCardSizeStore = create<CardSizeState>((set) => ({
  width: 300,
  height: 400,
  setSize: (size) => set(() => ({ width: size.width, height: size.height })),
}))

/** 명언 편집기의 카드 글자 스타일 정보 저장 */
export const useQuotesTextStyleStore = create<TextStyleState>((set) => ({
  color: 'black',
  size: 14.3,
  unit: 'px',
  font: 'NanumGothicLight',
  fontStyle: 'fill',
  setTextStyle: (style) =>
    set(() => ({
      color: style.color,
      size: style.size,
      unit: style.unit,
      font: style.font,
      fontStyle: style.fontStyle,
    })),
}))

/** 텍스트 옵션 */
export const useQuotesTextOptions = create<TextOptionState>((set) => ({

  lineHeight: 3,
  textPositionY: 0,
  textPositionX: 152,
  textLength: 20,
  setTextOption: (state) => set(() => ({ lineHeight: state.lineHeight, textPositionY: state.textPositionY, textPositionX: state.textPositionX, textLength: state.textLength }))
}))

/** 텍스트 외곽선 스타일 */
export const useQuotesStrokeStyleStore = create<StorkeState>((set) => ({
  thickness: 1,
  color: 'black',
  setStrokeThicknessStyle: (thickness) => set(() => ({ thickness })),
  setStrokeColorStyle: (color) => set(() => ({ color })),
}))


/** 텍스트 정렬 */
export const useQuotesTextAlign = create<AlignState>((set) => ({
  align: 'center',
  setAlign: (align) => set(() => ({ align }))
}))


/** 이미지 요소 저장 */
export const useImageElementStore = create<ImageElState>((set) => ({
  imageSrc: '/images/image0.png',
  isClear: false,
  setImageSrc: (imageSrc) => set(() => ({ imageSrc })),
  setImageReset: (state) => set(() => ({ isClear: state })),
}))



/** 명언 카드 이미지 초기 설정 및 추가 */
export const useImagesSrcStore = create<ImageSrcType>((set) => ({
  imagesSrc: defaultImagsSrc,
  setImagesSrc: (imagesSrc) => set(() => ({ imagesSrc: imagesSrc })),
  addImageSrc: (newImage) => set((state) => ({ imagesSrc: [...state.imagesSrc, newImage] }))
}))