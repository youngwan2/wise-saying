import { create } from "zustand";
import {
    LoginState,
    PostIdState,
    BgColorState,
    CardSizeState,
    TextStyleState, 
    LienHeightState, 
    StorkeState, 
    ImageElState,
    BookmarkToggleState,
    PagePathState
} from "../types/store.type";


// 유저 로그인 상태를 저장
export const useLoginStateStore = create<LoginState>((set) => ({
    loginState: false,
    setLoginState: (loginState) => set(() => ({ loginState: loginState }))
}))

// 유저 게시글의 식별자를 저장
export const useUserPostIdStore = create<PostIdState>((set) => ({
    postId: 0,
    setPostId: (id) => set(() => ({ postId: id }))
}))


// 유저가 선택한 배경 색을 저장
export const useBackgroundColorStore = create<BgColorState>((set) => ({
    bgColor: 'white',
    setBgColor: (bg) => set(() => ({ bgColor: bg }))
}))

// 명언 편집기의 카드 사이즈 저장
export const useQuotesCardSizeStore = create<CardSizeState>((set) => ({
    width: 300,
    height: 400,
    setSize: (size) => set(() => ({ width: size.width, height: size.height }))
}))

// 명언 편집기의 카드 글자 스타일 정보 저장
export const useQuotesTextStyleStore = create<TextStyleState>((set) => ({
    color: 'black',
    size: 14,
    unit: 'px',
    font: 'Arial',
    fontStyle: 'fill',
    setTextStyle: (style) => set(() => ({ color: style.color, size: style.size, unit: style.unit, font: style.font, fontStyle: style.fontStyle }))
}))

// 줄간격
export const useQuotesLineHeightStore = create<LienHeightState>((set) => ({
    lineHeight: 30,
    setLineHeight: (lineHeight) => set(() => ({ lineHeight }))
}))

// 텍스트 외곽선 스타일

export const useQuotesStrokeStyleStore = create<StorkeState>((set) => ({
    thickness: 1,
    color: 'black',
    setStrokeThicknessStyle: ((thickness) => set(() => ({ thickness}))),
    setStrokeColorStyle: ((color) => set(() => ({ color})))
    

}))


// 이미지 요소 저장
export const useImageElementStore = create<ImageElState>((set) => ({
    imageSrc: '/images/image1.png',
    isClear: false,
    setImageSrc: (imageSrc) => set(() => ({ imageSrc })),
    setImageReset: (state) => set(() => ({ isClear: state }))
}))


// 북마크 활성화 상태 및 리스트 저장 저장
export const useBookmarkStore = create<BookmarkToggleState>((set)=>({
    toggleState:false,
    bookmarkList : [],
    count:0,
    setToggleState: (toggle) => set(()=> ({toggleState: toggle})),
    setBookmarkList : (list) => set(()=> ({bookmarkList: list}) ),
    setListCount: (count) => set(() => ({ count}))

}))

