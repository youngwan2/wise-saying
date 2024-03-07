import { ChangeEvent } from 'react'
import toast from 'react-hot-toast'

/**
 * @param size 파일 용량(Byte 단위)
 * @returns
 */
function imageFileSizeChecker(size: number) {
  const isValidSize = size <= 500000

  if (!isValidSize) return false
  return true
}

/**
 * @param src 이미지 주소
 * @returns 이미지 크기가 230x230 을 벗어나는가? true/false
 */
function imageSizeChecker(src: string) {
  return new Promise((resolve) => {
    const tempImg = new Image()
    tempImg.src = src

    tempImg.addEventListener('load', () => {
      const { width, height } = tempImg
      if (width <= 230 && height <= 230) {
        resolve(true)
      }
      resolve(false)
    })

    tempImg.addEventListener('error', () => {
      resolve(false)
    })
  })
}

/**
 * 이미지 형식의 유효성 검사
 * @param imageType 이미지 타입 ex) 'image/jpeg' |  'image/jpg' |  'image/png'
 * @returns
 */
function imageTypeChecker(imageType: string) {
  const types = ['image/jpeg', 'image/jpg', 'image/png']
  const hasType = types.includes(imageType)

  if (!hasType) return false
  return true
}

/**
 * * 이미지 미리보기 주소(src)를 반환하는 함수
 * @param e ChangeEvent
 * @param type 현재 미리보기 이미지를 전처리하는 페이지의 타입 지정(mypage | styler)
 * @returns 이미지 주소를 반환(src)
 */
export const imagePreviewReader = async (
  e: ChangeEvent<HTMLInputElement>,
  type: 'mypage' | 'styler',
) => {
  if (e.target && e.target.files) {
    try {
      const file = e.target.files[0] || ''
      const { type: imageType, size } = file || { type: null }

      const hasType = imageTypeChecker(imageType)
      if (!hasType)
        return toast.error('jpeg, jpg, png 만 업로드 할 수 있습니다.')

      const src = URL.createObjectURL(file)

      if (type === 'mypage') {
        const isValidFileSize = imageFileSizeChecker(size)
        if (!isValidFileSize)
          return toast.error(
            '업로드 파일의 사이즈는 500KB를 초과할 수 없습니다.',
          )
        const isValidImageSize = await imageSizeChecker(src)
        if (!isValidImageSize)
          return toast.error('이미지 크기는 230x230 이하만 가능합니다.')
      }

      return src
    } catch (error) {
      return null
    }
  }
}
