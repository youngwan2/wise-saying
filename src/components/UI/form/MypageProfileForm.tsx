"use client"
import { imagePreviewReader, onSubmit } from "@/utils/commonFunctions"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { HiUpload } from "react-icons/hi"
import { storage } from "@/utils/firebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import useHasToken from "@/custom/useHasToken"
import { useRouter } from "next/navigation"
import ReplaceMessageCard from "../card/ReplaceMessageCard"

interface PropsType {
    userInfo: {
        nickname: string
        email: string
        profile_image: string
        user_id: number
    }
}

export default function MypageProfileForm({ userInfo }: PropsType) {
    const nicknameRef = useRef<HTMLInputElement>(null)
    const [src, setSrc] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [nickname, setNickname] = useState('')
    const hasToken = useHasToken()
    const router = useRouter()

    /**
     *  @var src : 미리보기 이미지
     *  @var userInfo.profile_image : 데이터베이스에 저장된 프로필 이미지
     */
    const initialImageSrc = src || userInfo?.profile_image || '/images/image1.png'


    // 파이어베이스 이미지 업로드 처리
    function imageUploader(e: ChangeEvent<HTMLInputElement>) {
        if (e.target && e.target.files) {
            const profileImageObject = e.target.files[0]
            const fileName = profileImageObject.name

            if (!fileName) return alert('파일 정보가 없습니다. 업로드를 취소합니다.')

            const profileRef = ref(storage, fileName)

            uploadBytes(profileRef, profileImageObject).then((snapshot) => {
                e.target.value = ''
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrl(url)
                })
            })
        }
    }

    // 유저 프로필 정보 업데이트
    async function updateUserInfo() {
        if (!hasToken) return alert('접근 권한이 없습니다.')
        const token = localStorage.getItem('token')
        const userInfo = {
            nickname: nickname,
            profile_image: imageUrl
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/upload', {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            const result = await response.json()
            console.log(result)
        } catch (error) {
            alert('전송 중 예기치 못한 문제가 발생하였습니다. 나중에 다시시도 해주세요.')
        }
    }

    // 닉네임 초깃값 지정
    useEffect(() => {
        if (!nicknameRef.current) return
        const nicknameInput = nicknameRef.current
        nicknameInput.value = userInfo?.nickname
    }, [userInfo?.nickname])


    // 프로필 이미지 초깃값 지정
    useEffect(() => {
        setImageUrl(userInfo?.profile_image)
    }, [userInfo?.profile_image])


    return (
        <section className="w-full min-h-[100vh]" >
            {userInfo !== undefined
                ?
                <form
                    className="border-[3px] p-[2em] rounded-[10px] max-w-[600px] flex flex-col mx-auto mt-[3em] items-center shadow-[5px_10px_10px_0_rgba(0,0,0,0.5)] bg-gradient-to-tr from-orange-50 to-white transition-all " onSubmit={onSubmit} >
                    {/* 이미지 업로드 */}
                    <article className="relative group">
                        <Image className="mx-auto rounded-full" src={initialImageSrc} alt="유저의 프로필 이미지" width={250} height={250} /> :
                        <label htmlFor="profile_image" className="group-hover:visible group-hover:scale-100 transition-all hover:cursor-pointer hover:border border-[black] p-[10px]  invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-[3em] scale-50"><HiUpload /></label>
                        <input
                            id="profile_image" type="file" className="hidden"
                            onChange={(e) => {
                                const src = imagePreviewReader(e)
                                src && setSrc(src)
                                imageUploader(e)
                            }
                            } />
                    </article>

                    {/* 닉네임 수정 */}
                    <article className="mt-[2em] text-center" >
                        <div className="mx-auto my-[5px]">
                            <label htmlFor="nickname" className="mr-[5px] rounded-[5px] text-center font-bold  min-w-[70px] inline-block">닉네임</label>
                            <input ref={nicknameRef} type="text" id="nickname" className="bg-[transparent] shadow-[inset_0_-2px_0_0_black] min-w-[200px] p-[6px]" onChange={(e) => {
                                const nickname = e.currentTarget.value
                                setNickname(nickname)
                            }} />
                        </div>
                        <div className="mx-auto my-[1em]">
                            <label htmlFor="email" className=" mr-[5px] rounded-[5px]  text-center font-bold min-w-[70px] inline-block">이메일</label>
                            <input readOnly value={userInfo.email} id="email" className="bg-[transparent] shadow-[inset_0_-2px_0_0_black]  min-w-[200px]  p-[6px]"></input>
                        </div>
                    </article>
                    <button className="shadow-[inset_-2px_-3px_3px_0_black] hover:bg-gradient-to-br hover:from-black  hover:to-slate-600  w-[230px] rounded-[5px] mt-[2em] bg-[#343333] text-white p-[10px]" onClick={updateUserInfo}>변경하기</button>
                </form>
                : null
            }
        </section>
    )
}