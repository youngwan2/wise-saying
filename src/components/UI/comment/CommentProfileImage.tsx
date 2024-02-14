import Image from "next/image";
import { PropsType } from "./CommentCard";


export default function CommentProfileImage({ item }: PropsType) {
    return (
        <Image
            src={item.profile_iamge ?? '/images/image1.png'}
            alt="프로필 이미지"
            width={68}
            height={68}
            className=" absolute left-[-1.5em] shadow-[0_0px_5px_0_rgba(0,0,0,0.8)] top-[50%] translate-y-[-50%] w-auto h-auto max-w-[68px] rounded-full"
        />
    )
}