
import EmailInput from './EmailInput'
import ForgotForm from './ForgotForm'

import { defaultFetch } from '@/utils/fetcher'
import { Method, defaultConfig } from '@/configs/config.api'
import { toast } from 'react-toastify'
import ControlButton from '../../common/button/ControlButton'


interface PropsType {
  uId: string
}
export default function ForgotPassword({ uId }: PropsType) {

  // Action: 비밀번호 재발급
  async function findPasswordAction(formData: FormData) {
    const email =
      formData
        .get(uId + 'email')
        ?.valueOf()
        .toString() || ''
    const config = defaultConfig(Method.POST, email)
    const url = '/api/auth/general-auth/forgot/password'
    const { success, meg } = await defaultFetch(url, config)
    if (success) toast.success(meg)
    else toast.error(meg)
  }

  return (
    <ForgotForm
      action={findPasswordAction}
      className="w-full max-w-mdp-8 rounded shadow-md mt-[2em]"
    >
      <EmailInput uId={uId} />
      <ControlButton type='submit' ariaLabel='전송 버튼' className='w-full bg-white text-black font-bold p-[0.7em] mt-[1em] rounded-[5px] focus:outline-none focus:bg-blue-700 hover:bg-gradient-to-br from-[white] to-[#acaaaa]  transition-all'>
        임시 비밀번호 발급 받기
      </ControlButton>
    </ForgotForm>
  )
}
