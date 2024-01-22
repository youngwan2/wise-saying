import useHasToken from '@/custom/useHasToken'
import { updateUserInfo } from '@/api/user/post'

interface PropsType {
  nickname: string
  imageUrl: string
}
export default function MypageProfileUpdateButton({
  nickname,
  imageUrl,
}: PropsType) {
  const hasToken = useHasToken()
  return (
    <button
      className="shadow-[inset_-2px_-3px_3px_0_black] hover:bg-gradient-to-br hover:from-black  hover:to-slate-600  w-[230px] rounded-[5px] mt-[2em] bg-[#343333] text-white p-[10px]"
      onClick={() => {
        updateUserInfo(hasToken, nickname, imageUrl)
      }}
    >
      변경하기
    </button>
  )
}
