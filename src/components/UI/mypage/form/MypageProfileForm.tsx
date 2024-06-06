'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import useHasToken from '@/custom/useHasToken'

import MypageImageUploadInputContainer from '../input/MypageImageUploadInput'
import MypageNicknameInputContainer from '../container/MypageNicknameInputContainer'
import MypageProfileUpdateButton from '../MypageProfileUpdataButton'

import { updateUserInfo } from '@/services/user/patch'
import { imagePreviewReader } from '@/utils/imageloader'

import toast from 'react-hot-toast'
import { storage } from '@/configs/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'


interface PropsType {
  userInfo: {
    nickname: string
    email: string
    profile_image: string
    user_id: number
  }
}

export default function MypageProfileForm({ userInfo }: PropsType) {
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
  function profileUpdateAction(form: FormData) {
    if (!hasToken) return toast.error('접근 권한이 없습니다.')
    const profileUrl = imageUrl
    const nickname = form.get('nickname') || ''
    updateUserInfo(nickname, profileUrl)
  }

  // 이미지 업로드
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
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
          action={profileUpdateAction}
        >
          {/* 이미지 업로드 */}
          <MypageImageUploadInputContainer
            src={initialImageSrc}
            onChange={handleImageUpload}
          />

          {/* 닉네임 수정 */}
          <MypageNicknameInputContainer nickname={userInfo.nickname} />

          {/* 수정버튼 */}
          <MypageProfileUpdateButton imgIsLoading={imgIsLoading} />
        </form>
      ) : null}
    </>
  )
}
