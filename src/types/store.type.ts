export interface LoginState { loginState: boolean; setLoginState: (loignState: boolean) => void }
export interface PostIdState { postId: number; setPostId: (id: number) => void }
export interface BgColorState { bgColor: string;  setBgColor: (bg: string) => void }

type SizeType = { width: number;  height: number }
export interface CardSizeState extends SizeType { setSize: (size: SizeType) => void }

type TextType = { color: string;  size: number;  unit: string;  font: string;  fontStyle: string }
export interface TextStyleState extends TextType { setTextStyle: (style: TextType) => void }

export type TextOptionType = { textPositionY: number;  textPositionX: number;  lineHeight: number; textLength: number }
export interface TextOptionState extends TextOptionType { setTextOption: (state: TextOptionType) => void }

type StorkeType = { color: string;  thickness: number }
export interface StorkeState extends StorkeType { setStrokeThicknessStyle: (thickness: number) => void;  setStrokeColorStyle: (color: string) => void }

export interface AlignState { align: string; setAlign: (align: string) => void }
export interface ImageElState { imageSrc: string;  isClear: boolean;  setImageSrc: (imageSrc: string) => void; setImageReset: (state: boolean) => void }
export interface BookmarkToggleState { toggleState: boolean;  bookmarkList: [];  count: number;  setToggleState: (toggle: boolean) => void;  setBookmarkList: (list: any) => void;   setListCount: (count: number) => void }
export interface MypageTapsState { tapId: number; setTapId: (tapId: number) => void}


interface UserInfoType {
  userId: number
  email: string
  nickname: string
  profileImage: string
  width: number
  height: number
}
export interface UserInfoState extends UserInfoType { setUserInfo: (userInfo: UserInfoType) => void }

export interface CardZoomInOutState {
  isZoomIn: boolean
  cardIndex: number | 0
  setIsZoomIn: (isZoomIn: boolean) => void
  setCardIndex: (index: number) => void
}

export interface NavDisplayState { isDisplay: boolean;  setIsDisplay: (display: boolean) => void }
export interface HeaderSearchFormDisplayState { isDisplay: boolean;   setIsDisplay: (display: boolean) => void }
export interface TtsTraceIndexState { traceIndex: number;  setTraceIndex: (index: number) => void }
export interface BodyOverflowState { isHidden: boolean;  setIsHidden: (isHidden: boolean) => void }
export interface UpdateState { isUpdate: boolean;  setIsUpdate: (isUpdate: boolean) => void }
export interface PolicyTapState { tapNum: number;  setTapNum: (tapNum: number) => void }
export interface CardThemeState { isCardTheme: boolean;  setIsCardTheme: (isCardTheme: boolean) => void }
export interface ImageSrcType { imagesSrc: string[];  setImagesSrc: (imagesSrc: string[]) => void;  addImageSrc: (newImage: string) => void }