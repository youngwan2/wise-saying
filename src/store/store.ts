import { create } from 'zustand'
import type {
  LoginState,
  PostIdState,
  BgColorState,
  CardSizeState,
  TextStyleState,
  LienHeightState,
  StorkeState,
  ImageElState,
  BookmarkToggleState,
  MypageTapsState,
  UserInfoState,
  CardZoomInOutState,
  NavDisplayState,
  HeaderSearchFormDisplayState,
  BodyOverflowState,
} from '../types/store.type'

/**
 * * Zustand| 유저 로그인 상태를 저장
 */
export const useLoginStateStore = create<LoginState>((set) => ({
  loginState: false,
  setLoginState: (loginState) => set(() => ({ loginState: loginState })),
}))

/**
 * * Zustand |  유저 게시글의 식별자를 저장
 */
export const useUserPostIdStore = create<PostIdState>((set) => ({
  postId: 0,
  setPostId: (id) => set(() => ({ postId: id })),
}))

/**
 * * Zustand |  유저가 선택한 배경 색을 저장
 */
export const useBackgroundColorStore = create<BgColorState>((set) => ({
  bgColor: 'white',
  setBgColor: (bg) => set(() => ({ bgColor: bg })),
}))

/**
 * * Zustand |  명언 편집기의 카드 사이즈 저장
 */
export const useQuotesCardSizeStore = create<CardSizeState>((set) => ({
  width: 300,
  height: 400,
  setSize: (size) => set(() => ({ width: size.width, height: size.height })),
}))

/**
 * * Zustand |  명언 편집기의 카드 글자 스타일 정보 저장
 */
export const useQuotesTextStyleStore = create<TextStyleState>((set) => ({
  color: 'black',
  size: 14,
  unit: 'px',
  font: 'Arial',
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

/**
 * * Zustand |  줄간격
 */
export const useQuotesLineHeightStore = create<LienHeightState>((set) => ({
  lineHeight: 30,
  setLineHeight: (lineHeight) => set(() => ({ lineHeight })),
}))

/**
 * * Zustand |  텍스트 외곽선 스타일
 */
export const useQuotesStrokeStyleStore = create<StorkeState>((set) => ({
  thickness: 1,
  color: 'black',
  setStrokeThicknessStyle: (thickness) => set(() => ({ thickness })),
  setStrokeColorStyle: (color) => set(() => ({ color })),
}))

/**
 * * Zustand |  이미지 요소 저장
 */
export const useImageElementStore = create<ImageElState>((set) => ({
  imageSrc: '/images/image1.png',
  isClear: false,
  setImageSrc: (imageSrc) => set(() => ({ imageSrc })),
  setImageReset: (state) => set(() => ({ isClear: state })),
}))

/**
 * * Zustand | 북마크 활성화 상태 및 리스트 저장
 */
export const useBookmarkStore = create<BookmarkToggleState>((set) => ({
  toggleState: false,
  bookmarkList: [],
  count: 0,
  setToggleState: (toggle) => set(() => ({ toggleState: toggle })),
  setBookmarkList: (list) => set(() => ({ bookmarkList: list })),
  setListCount: (count) => set(() => ({ count })),
}))

/**
 * *  Zustand | 마이페이지 메뉴 탭의 id 저장
 */
export const useMypageTapsStore = create<MypageTapsState>((set) => ({
  tapId: 0,
  setTapId: (tapId) => set(() => ({ tapId })),
}))

/**
 * *  Zustand | 로그인한 유저 정보를 저장
 */
export const useUserInfoStore = create<UserInfoState>((set) => ({
  userId: 0,
  email: 'example@text.com',
  nickname: '없음',
  profileImage: '/images/image1.png',
  width: 200,
  height: 200,
  setUserInfo: (userInfo) =>
    set(() => ({
      userId: userInfo.userId,
      email: userInfo.email,
      nickname: userInfo.nickname,
      profileImage: userInfo.profileImage,
    })),
}))

/**
 * * Zustand |  명언 카드 확대(클로즈 업) 관련 상태 저장
 */
export const useCardZoomInOutStore = create<CardZoomInOutState>((set) => ({
  isZoomIn: false,
  cardIndex: 0,
  setIsZoomIn: (isZoomIn) => set(() => ({ isZoomIn })),
  setCardIndex: (cardIndex) => set(() => ({ cardIndex })),
}))

/**
 * * Zustand |  네비게이션 메뉴 온오프 상태 저장
 */
export const useNavDisplayStateStore = create<NavDisplayState>((set) => ({
  isDisplay: false,
  setIsDisplay: (display) => set(() => ({ isDisplay: display })),
}))

/**
 * * Zustand |  헤더 검색창 온오프 상태 저장
 */
export const useHeaderSearchFormStateStore =
  create<HeaderSearchFormDisplayState>((set) => ({
    isDisplay: false,
    setIsDisplay: (display) => set(() => ({ isDisplay: display })),
  }))

/**
 * * Zustand | 바디 객체의 오버플로우 옵션 활성화 상태 저장
 */
export const useBodyOverflowStore = create<BodyOverflowState>((set) => ({
  isHidden: false,
  setIsHidden: (isHidden) => set(() => ({ isHidden })),
}))
