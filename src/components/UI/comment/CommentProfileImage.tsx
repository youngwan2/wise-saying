import { CommentType } from '@/types/items.types'
import Image from 'next/image'

interface PropsType extends CommentType {}
export default function CommentProfileImage({ comment }: PropsType) {
  return (
    <Image
      src={comment.profile_iamge ?? '/images/image1.png'}
      alt="프로필 이미지"
      width={50}
      height={50}
      className=" absolute left-[-1.5em] shadow-[0_0px_5px_0_rgba(0,0,0,0.8)] top-[50%] translate-y-[-50%] w-auto h-auto max-w-[50px] rounded-full"
    />
  )
}
