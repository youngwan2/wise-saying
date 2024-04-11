'use client'

import useHasToken from '@/custom/useHasToken'
import { deleteUserInfo } from '@/services/user/delete'
import { updateUserPassword } from '@/services/user/patch'
import { Session } from 'next-auth'
import { useId } from 'react'
import toast from 'react-hot-toast'

interface PropsType {
  userInfo: {
    nickname: string
    email: string
    profile_image: string
    user_id: number
  }
  session: Session | null
}

export default function MypageUserInfoForm({ userInfo, session }: PropsType) {
  const uId = useId()
  const hasToken = useHasToken()

  // Actions | 유저 비밀번호 재설정
  async function updateUserInfo(data: FormData) {
    const password = data.get('password')?.valueOf().toString() || ''
    const confirm = data.get('confirm')?.valueOf().toString() || ''

    if (password.length < 8 || confirm.length < 8)
      return alert('비밀번호 형식에 맞춰 입력해주세요.')
    if (password !== confirm) return alert('일치하지 않습니다.')
    if (!userInfo || !hasToken) return

    const { user_id: userId } = userInfo || { user_id: 0 }

    updateUserPassword(password, userId)
  }

  return (
    <form
      action={updateUserInfo}
      className=" mx-auto m-2 mt-[3em] p-6  border border-[rgba(255,255,255,0.1)] rounded-[5px] max-w-[600px] text-white "
    >
      <h1 className="text-[1.25em] mb-[1.5em]">
        비밀번호 변경/ 회원 탈퇴
      </h1>
      {/* 이메일(읽기 전용) */}
      <div className="mb-5 cursor-not-allowed">
        <label className="mb-2" htmlFor={uId + 'email'}>
          이메일(Email)
        </label>
        <input
          aria-readonly="true"
          type="text"
          readOnly
          id={uId + 'email'}
          className="mt-[0.25em]  w-full px-3 py-2 rounded-[3px] outline-none bg-[#dedbdb2d] text-white cursor-not-allowed "  value={userInfo.email}
        ></input>
      </div>
      <article className={session ? 'hidden' : ''}>
        {/* 비밀번호 */}
        <div className="mb-5">
          <label className="  mb-2" htmlFor={uId + 'password'}>
            비밀번호(Password)
          </label>
          <input
            pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$"
            type="password"
            name="password"
            autoComplete="off"
            className="focus:bg-[rgba(255,255,255,0.15)] focus:text-black outline-none  mt-[0.25em]  w-full px-3 py-2 s rounded-[3px]  border border-[rgba(255,255,255,0.1)] invalid:border-[#f39797] bg-transparent "
            placeholder="8자 이상 (a-z, 0-9 무조건 1개 이상 포함, 특수문자 1개 이상 포함)"
          />
        </div>
        {/* 비밀번호 재확인 */}
        <div className="mb-5">
          <label className="  mb-2" htmlFor={uId + 'confirm'}>
            비밀번호 재확인(Confirm)
          </label>
          <input
            aria-label="비밀번호 재확인 창으로, 앞서 비밀번호와 동일한 값을 입력"
            pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$"
            type="password"
            name="confirm"
            autoComplete="off"
            className="focus:bg-[rgba(255,255,255,0.15)] focus:text-black  outline-none  mt-[0.25em] w-full px-3 py-2  rounded-[3px]   border border-[rgba(255,255,255,0.1)] invalid:border-[#f39797] bg-transparent "
            placeholder="비밀번호 재확인"
          />
        </div>
      </article>
      {/* 수정 및 탈퇴 버튼 */}
      <article className="mt-[2em]">
        <button
          aria-label="수정하기 버튼으로, 클릭 시 입력된 정보로 패스워드(비밀번호)가 변경"
          className={`${session ? 'hidden' : ''} bg-white text-black font-bold px-3 py-[8px] hover:bg-[#e6e3e3] rounded-[3px] mr-2`}
        >
          수정하기
        </button>
        <button
          aria-label="탈퇴하기 버튼으로, 버튼 클릭 시 회원탈퇴 라고 입력 후 확인을 엔터 혹은 클릭해야 하는 창 생성 "
          type="button"
          onClick={() => {
            if (!hasToken || !userInfo?.user_id)
              return toast.error('접근 권한이 없습니다.')
            deleteUserInfo(userInfo.user_id)
          }}
          className="bg-[white] text-black font-bold px-3 py-[8px] rounded-[3px] hover:bg-[#e6e3e3] transition-all"
        >
          탈퇴하기
        </button>
      </article>
    </form>
  )
}
