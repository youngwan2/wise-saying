'use client'
import { imagePreviewReader } from '@/utils/commonFunctions'
import { ChangeEvent, useEffect, useState } from 'react'
import { storage } from '@/utils/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import MypageProfileUpdateButton from '../button/MypageProfileUpdataButton'
import { updateUserInfo } from '@/services/user/post'
import useHasToken from '@/custom/useHasToken'
import MypageImageUploadInput from './MypageImageUploadInput'
import MypageNicknameInput from './MypageNicknameInput'
import MypageEmailInput from './MypageEmailInput'

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


  // 프로필 이미지 초깃값 지정
  useEffect(() => {
    setImageUrl(userInfo?.profile_image)
  }, [userInfo?.profile_image])


  // 프로필 업데이트
  function profileUpdate(form: FormData) {
    const profileUrl = imageUrl
    const nickname = form.get('nickname') || ''

    updateUserInfo(hasToken, nickname, profileUrl)
  }

  // 이미지 업로드
  const onChangeImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const src = imagePreviewReader(e)
    src && setSrc(src)
    imageUploader(e)
  }

  return (
    <>
      {userInfo !== undefined ? (
        <form
          className="border-[3px] p-[2em] rounded-[10px] max-w-[600px] flex flex-col mx-auto mt-[3em] items-center shadow-[5px_10px_10px_0_rgba(0,0,0,0.5)] bg-gradient-to-tr from-orange-50 to-white transition-all "
          action={profileUpdate}
        >
          {/* 이미지 업로드 */}
          <MypageImageUploadInput src={initialImageSrc} onChange={onChangeImageUpload} />

          {/* 닉네임 수정 */}
          <article className="mt-[2em] text-center">
            <MypageNicknameInput nickname={userInfo.nickname} />
            <MypageEmailInput email={userInfo.email} />

          </article>
          <MypageProfileUpdateButton />
        </form>
      ) : null}
    </>
  )
}
