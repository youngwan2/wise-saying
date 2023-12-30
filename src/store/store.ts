import { create } from "zustand";

interface LoginState {
    loginState: boolean
    setLoginState: (loignState: boolean) => void
}

interface PostIdState {
    postId: number
    setPostId: (id: number) => void
}

interface BgColorState {
    bgColor: string
    setBgColor: (bg: string) => void
}

type SizeType = {
    width: number
    height: number
}
interface CardSizeState extends SizeType {
    setSize: (size: SizeType) => void
}

type TextType = {
    color: string
    size: number
    unit: string
    font: string
    fontStyle: string
}

interface TextStyleState extends TextType {
    setTextStyle: (style: TextType) => void
}


interface LienHeightState {
    lineHeight: number
    setLineHeight : (height: number) => void
}

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
    setTextStyle: (style) => set(() => ({ color: style.color, size: style.size, unit: style.unit, fontStyle: style.fontStyle }))
}))

// 줄간격
export const useQuotesLineHeightStore = create<LienHeightState>((set)=>({
    lineHeight:30,
    setLineHeight:(lineHeight) => set(()=> ({lineHeight}))
}))