'use client'

import { useEffect} from 'react'
import { useRouter } from 'next/navigation'
import useHasToken from '@/custom/useHasToken'

import ReplaceMessageCard from '../../common/card/ReplaceMessageCard'

import { logoutUser } from '@/utils/common-func'

export default function LogoutGuideModal() {
  const { push } = useRouter()
  const hasToken = useHasToken()

  function handleLogout() {
    logoutUser()
  }

  function handleBackMove() {
    push('/')

  }

  useEffect(() => {
    if (sessionStorage.getItem('user') === null) return push('/')
  }, [push])

  if (!hasToken) return <ReplaceMessageCard>로그아웃 처리 중입니다...</ReplaceMessageCard>
  if (hasToken) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">로그아웃 확인</h2>
            <p className="mb-6">
              정말로 로그아웃 하시겠습니까? 로그아웃 하시면 다시 로그인해야 합니다.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleBackMove}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}
