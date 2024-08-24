import { LoginState, UserInfoState } from "@/types/store.type"
import { create } from "zustand"

/**  로그인한 유저 정보를 저장 */
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

  /** 유저 로그인 상태를 저장 */
export const useLoginStateStore = create<LoginState>((set) => ({
    loginState: false,
    setLoginState: (loginState) => set(() => ({ loginState: loginState })),
  }))
  
  