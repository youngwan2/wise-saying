import Image from "next/image";
import './CommentCard.css'
import ReplaceMessageCard from "./ReplaceMessageCard";

interface PropsType {
    item: {
        id: number
        email: string
        nickname: string | null
        profile_iamge: string | null
        comment: string
    }
}
export default function CommentCard({ item }: PropsType) {

    if (!item) return <ReplaceMessageCard childern="데이터를 가져오는 중입니다." />
    return (
        <li className="comment-card bg-white  min-h-[50px] rounded-[20px] first:mt-[2em] mt-[1em] flex justify-start items-center w-full mx-auto relative">
            <Image src={item.profile_iamge ?? "/images/image1.png"} alt="프로필 이미지" width={60} height={60} className="rounded-full absolute left-[-1.5em] shadow-[0_0px_5px_0_rgba(0,0,0,0.8)] top-[50%] translate-y-[-50%]" />
            <div className=" ml-[3em] py-[10px]">
                <span className="font-semibold inline-block mt-[0.2em] text-[14px]">{item.nickname || '무명의 위인'}({item.email.replace(item.email.slice(2,4),'**')})</span>
                <p>{item.comment}</p>
            </div>
        </li>
    )
}