"use client"

import useHasToken from "@/custom/useHasToken"
import { deleteUserInfo } from "@/services/user/delete"
import {  updateUserInfoFetcher } from "@/services/user/patch"
import { useRouter } from "next/navigation"
import { useId } from "react"

interface PropsType {
    userInfo: {
        nickname: string
        email: string
        profile_image: string
        user_id: number
    }
}

export default function MypageUserInfoForm({ userInfo }: PropsType) {

    const uId = useId()
    const hasToken = useHasToken();
    const router = useRouter()


    // Actions | 유저 비밀번호 재설정
    async function updateUserInfo(data: FormData) {
        const password = data.get('password')?.valueOf().toString() || ''
        const confirm = data.get('confirm')?.valueOf().toString() || ''

        if (password.length < 8 || confirm.length < 8) return alert('비밀번호 형식에 맞춰 입력해주세요.')
        if (password !== confirm) return alert('일치하지 않습니다.')
        if (!userInfo || !hasToken) return

        const { user_id: userId } = userInfo || { user_id: 0 }

        updateUserInfoFetcher(password, router, userId)
    }

    return (
        <form action={updateUserInfo} className="max-w-lg mx-auto mt-[3em] p-6 bg-white rounded-lg shadow-[10px_10px_5px_0_rgba(0,0,0,0.5)]">
            <h1 className="text-2xl font-bold mb-4">수정 및 탈퇴</h1>
            {/* 이메일(읽기 전용) */}
            <div className="mb-4">
                <label className="text-lg font-semibold mb-2" htmlFor={uId + 'email'}>이메일(Email)</label>
                <input type="text" readOnly id={uId + 'email'}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none bg-[#c8c6c6] "
                    value={userInfo.email}></input>
            </div>
            {/* 비밀번호 */}
            <div className="mb-4">
                <label className="text-lg font-semibold mb-2" htmlFor={uId + 'password'}>비밀번호(Password)</label>
                <input
                    aria-label="알파벳(a 부터 z), 0에서 9까지 중 각각 1개 이상을 포함하고, 특수문자를 1개 이상 포함하여 8자 이상 작성"
                    pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$"
                    type="password"
                    name="password"
                    autoComplete="off"
                    className="w-full px-3 py-2 border rounded-lg invalid:border-[red]"
                    placeholder="8자 이상 (a-z, 0-9 무조건 1개 이상 포함, 특수문자 1개 이상 포함)"
                />
            </div>
            {/* 비밀번호 재확인 */}
            <div className="mb-4">
                <label className="text-lg font-semibold mb-2" htmlFor={uId + 'confirm'}>비밀번호 재확인(Confirm)</label>
                <input
                   aria-label="비밀번호 재확인 창으로, 앞서 비밀번호와 동일한 값을 입력"
                    pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])[a-zA-Z0-9!@#$%^&+=]{8,}$"
                    type="password"
                    name="confirm"
                    autoComplete="off"
                    className="w-full px-3 py-2 border rounded-lg invalid:border-[red] "
                    placeholder="비밀번호 재확인"
                />
            </div>
            {/* 수정 및 탈퇴 버튼 */}
            <article className="mt-[2em]">
                <button aria-label="수정하기 버튼으로, 클릭 시 입력된 정보로 패스워드(비밀번호)가 변경" className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
                    수정하기
                </button>
                <button aria-label="탈퇴하기 버튼으로, 버튼 클릭 시 회원탈퇴 라고 입력 후 확인을 엔터 혹은 클릭해야 하는 창 생성 " type="button" onClick={() => {
                    if (!hasToken || !userInfo?.user_id) return alert('접근 권한이 없습니다.')
                    deleteUserInfo(userInfo.user_id, router)
                }} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                    탈퇴하기
                </button>
            </article>
        </form>
    )
}