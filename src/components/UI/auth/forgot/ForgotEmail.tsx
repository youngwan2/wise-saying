import EmailInput from './EmailInput'

import { defaultFetch } from '@/utils/fetcher'
import { Method, defaultConfig } from '@/configs/config.api'
import { toast } from 'react-toastify'
import ForgotForm from './ForgotForm'
import ControlButton from '../../common/button/ControlButton'

interface PropsType {
  uId: string
}
export default function ForgotEmail({ uId}: PropsType) {

    // Action : 이메일 찾기
    async function findEmailAction(formData: FormData) {
      const email =
        formData
          .get(uId + 'email')
          ?.valueOf()
          .toString() || ''
      const config = defaultConfig(Method.POST, email)
      const url = '/api/auth/general-auth/forgot/email'
      const { success, meg } = await defaultFetch(url, config)
      if (success) toast.success(meg)
      else toast.error(meg)
    }
  
  return (
    <ForgotForm action={findEmailAction} className='mt-[2em] w-full'>
      <EmailInput uId={uId} />
      <ControlButton type='submit' ariaLabel='전송 버튼' className='w-full bg-white text-black font-bold p-[0.7em] mt-[1em] rounded-[5px] focus:outline-none focus:bg-blue-700 hover:bg-gradient-to-br from-[white] to-[#acaaaa]  transition-all'>
        이메일 찾기
      </ControlButton>
    </ForgotForm>
  )
}
