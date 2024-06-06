'use client'

import useHasToken from '@/custom/useHasToken'

import EmailField from '../field/EmailField'
import PasswordFields from '../field/PasswordFields'
import MypageActionButtons from '../button/MypageActionButtons'
import FormTitle from '../../common/Title/FormTitle'

import { deleteUserInfo } from '@/services/user/delete'
import { updateUserPassword } from '@/services/user/patch'

import toast from 'react-hot-toast'



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
  async function updateUserInfo(data: FormData) {
    const password = data.get('password')?.valueOf().toString() || ''
    const confirm = data.get('confirm')?.valueOf().toString() || ''

    if (password.length < 8 || confirm.length < 8)
      return alert('비밀번호 형식에 맞춰 입력해주세요.')
    if (password !== confirm) return alert('일치하지 않습니다.')
    if (!userInfo || !hasToken) return

    const { user_id: userId = 0 } = userInfo || {}

    updateUserPassword(password, userId)
  }

  function onDeleteUserInfo() {
    if (!hasToken || !userInfo?.user_id) return toast.error('접근 권한이 없습니다.')
    deleteUserInfo(userInfo.user_id)
  }

  return (
    <form
      action={updateUserInfo}
      className=" mx-auto m-2 mt-[1em] p-6 rounded-[5px] max-w-[600px] text-white "
    >
      <FormTitle elementName='h2' className="text-[1.25em] mb-[1.5em]">
        비밀번호 변경/ 회원 탈퇴
      </FormTitle>
      <EmailField email={userInfo.email} />
      <PasswordFields />
      {/* 수정 및 탈퇴 버튼 */}
      <div className="mt-[2em]">
        <MypageActionButtons onClick={onDeleteUserInfo} />
      </div>
    </form>
  )
}
