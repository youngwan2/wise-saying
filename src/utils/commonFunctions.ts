import { ItemsType } from '@/types/items.types'
import { ChangeEvent, FormEvent } from 'react'

/**
 * 페이지 이동 함수
 * @param router next/navigation의 useRouter()
 * @param id 페이지 식별자
 * @returns {boolean} 페이지 전환 유무를 반환
 */
export const pageSwitch = (router: any, id: number) => {
  router.push(`/quotes-styler/auhtor/${id}`)

  return true
}

/**
 * * 명언 선택 함수
 * @param items - 전체 아이템 목록
 * @param id - 선택할 아이템의 식별자
 */
export function quotesSelector(items: ItemsType[], id: number) {
  const item = items.find((item) => item.id === id)
  localStorage.setItem('selectedItem', JSON.stringify(item))
}

/**
 * * 토큰 만료 이후 강제 로그아웃 함수
 * */
export const logoutUser = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  alert(
    '보안을 위해 로그인 가능 시간이 만료되어 로그아웃 처리 됩니다. 서비스를 계속 이용하시려면 다시 로그인 해주세요.',
  )
  location.replace('/')
}

/**
 * * 이미지 미리보기 주소(src)를 반환하는 함수
 * @param e ChangeEvent
 * @returns {string} 이미지 주소를 반환(src)
 */
export const imagePreviewReader = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target && e.target.files) {
    try {
      const file = e.target.files[0]
      const src = URL.createObjectURL(file)
      return src
    } catch (error) {
      alert('파일 업로드 중 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요.')
    }
  }
}

// submit 브라우저 이벤트 방지
export const onSubmit = (e: FormEvent) => {
  e.preventDefault()
}
