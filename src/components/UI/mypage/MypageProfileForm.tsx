'use client'
import { imagePreviewReader } from '@/utils/imageloader'
import { ChangeEvent, useEffect, useState } from 'react'
import { storage } from '@/configs/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import MypageProfileUpdateButton from './MypageProfileUpdataButton'
import { updateUserInfo } from '@/services/user/patch'
import useHasToken from '@/custom/useHasToken'
import MypageImageUploadInput from './MypageImageUploadInput'
import MypageNicknameInput from './MypageNicknameInput'
import MypageEmailInput from './MypageEmailInput'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { Session } from 'next-auth'

interface PropsType {
  userInfo: {
    nickname: string
    email: string
    profile_image: string
    user_id: number
  }
  session: Session | null
}

export default function MypageProfileForm({ userInfo, session }: PropsType) {
  const hasToken = useHasToken()
  const [src, setSrc] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imgIsLoading, setImgIsLoading] = useState(false)

  /**
   *  @var src : 미리보기 이미지
   *  @var userInfo.profile_image : 데이터베이스에 저장된 프로필 이미지
   */
  const initialImageSrc = src || userInfo?.profile_image || '/images/image1.png'

  // 파이어베이스 이미지 업로드 처리
  function imageUploader(e: ChangeEvent<HTMLInputElement>) {
    setImgIsLoading(true)
    if (e.target && e.target.files) {
      const profileImageObject = e.target.files[0]
      const { name: fileName } = profileImageObject || { name: null }
      const profileRef = ref(storage, 'profile-images/' + uuidv4() + fileName)

      uploadBytes(profileRef, profileImageObject).then((snapshot) => {
        e.target.value = ''
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url)
          setImgIsLoading(false)
        })
      })
    }
  }

  // 프로필 이미지 초깃값 지정
  useEffect(() => {
    setImageUrl(userInfo?.profile_image)
  }, [userInfo?.profile_image])

  // 프로필 업데이트
  function profileUpdate(form: FormData) {
    if (!hasToken && !session) return toast.error('접근 권한이 없습니다.')
    const profileUrl = imageUrl
    const nickname = form.get('nickname') || ''
    updateUserInfo(nickname, profileUrl)
  }

  // 이미지 업로드
  const onChangeImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const src = (await imagePreviewReader(e, 'mypage')) || ''
    if (src?.length < 2) return
    setSrc(src)
    imageUploader(e)
  }

  return (
    <>
      {userInfo !== undefined ? (
        <form
          className="p-[2em] flex flex-col mx-auto items-center w-full "
          action={profileUpdate}
        >
          {/* 이미지 업로드 */}
          <MypageImageUploadInput
            src={initialImageSrc}
            onChange={onChangeImageUpload}
          />

          {/* 닉네임 수정 */}
          <article className="mt-[2em]">
            <MypageNicknameInput nickname={userInfo.nickname} />
            <MypageEmailInput email={userInfo.email} />
          </article>
          <MypageProfileUpdateButton imgIsLoading={imgIsLoading} />
        </form>
      ) : null}
    </>
  )
}
