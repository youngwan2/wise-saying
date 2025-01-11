'use client'

import useHasToken from '@/custom/useHasToken'

import EmailField from '../field/EmailField'
import PasswordFields from '../field/PasswordFields'
import MypageActionButtons from '../button/MypageActionButtons'


import toast from 'react-hot-toast'
import { deleteUserAccount, updateUserPassword } from '@/services/user/mypage.service'
import { logoutUser } from '@/services/user/auth.service'



interface PropsType {
  userInfo: {
    nickname: string
    email: string
    profile_image: string
    user_id: number
  }
}

export default function MypageUserInfoForm({ userInfo }: PropsType) {

  const hasToken = useHasToken()

  // Actions | 유저 비밀번호 재설정
  async function onUpdateUserPassword(data: FormData) {
    const password = data.get('password')?.valueOf().toString() || ''
    const confirm = data.get('confirm')?.valueOf().toString() || ''

    if (password.length < 8 || confirm.length < 8)
      return alert('비밀번호 형식에 맞춰 입력해주세요.')

    if (password !== confirm) return alert('일치하지 않습니다.')
    if (!userInfo || !hasToken) return

    const { success, meg } = await updateUserPassword(password)

    if (success) {
      toast.success('변경되었습니다. 보안을 위해 다시 로그인 해주세요')
      logoutUser()
    }
    if (!success) toast.error(meg)
  }

  async function onDeleteUser() {
    if (!hasToken || !userInfo?.user_id) return toast.error('접근 권한이 없습니다.')
    const isDelete = prompt(
      '정말로 회원탈퇴를 시도하시려면, "회원탈퇴" 라고 입력해주세요. ',
    )
    if (isDelete !== '회원탈퇴')
      return toast.error('틀렸습니다. 정확하게 입력해주세요.')

    const { success, meg } = await deleteUserAccount()

    if (success) return logoutUser()
    if (!success) return toast.error(meg)
  }

  return (
    <form
      action={onUpdateUserPassword}
      className=" mx-auto m-2 px-6 rounded-[5px] max-w-[600px] text-white "
    >
      <EmailField email={userInfo.email} />
      <PasswordFields />
      {/* 수정 및 탈퇴 버튼 */}
      <div className="mt-[2em]">
        <MypageActionButtons onClick={onDeleteUser} />
      </div>
    </form>
  )
}
