'use client'

import { ChangeEventHandler } from 'react'

import Label from '../../common/Label'
import Input from '../../common/Input'

import { onSubmit } from '@/utils/common-func'
import { HiUpload } from 'react-icons/hi'

interface PropsType {
  selectTapNum: number
  onChangeImageUploader: ChangeEventHandler<HTMLInputElement>
}
export default function StylerImageUploadForm({
  selectTapNum,
  onChangeImageUploader
}: PropsType) {

  if (selectTapNum !== 2) return null

  return (
    <div className="space-y-4">
      <h3 className='text-gray-900 font-semibold text-lg'>이미지 업로드</h3>
      <form
        className="group cursor-pointer"
        onSubmit={onSubmit}
      >
        <Label
          aria-label="명언 카드 배경 이미지 업로더"
          className="cursor-pointer flex flex-col items-center justify-center 
                     w-full h-48 border-2 border-dashed border-gray-300 
                     rounded-lg hover:border-blue-400 hover:bg-blue-50 
                     transition-all duration-200 bg-gray-50"
          htmlFor="image_upload"
        >
          <HiUpload className="text-4xl text-gray-400 group-hover:text-blue-500 transition-colors" />
          <p className="mt-2 font-medium text-gray-600 group-hover:text-blue-600">
            이미지 업로드
          </p>
          <p className="mt-1 text-sm text-gray-500">
            JPG, JPEG, PNG 파일만 지원
          </p>
        </Label>

        <Input
          aria-label='업로드 버튼'
          onChange={onChangeImageUploader}
          id="image_upload"
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          className="hidden"
        />
      </form>
    </div>
  )
}

