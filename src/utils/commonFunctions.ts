import { ItemsType } from '@/types/items.types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ChangeEvent, FormEvent } from 'react'

/**
 * 페이지 이동 함수
 * @param router next/navigation의 useRouter()
 * @param id 페이지 식별자
 * @returns 페이지 전환 유무를 반환
 */
export const pageSwitch = (router: AppRouterInstance, id: number) => {
  router.push(`/quotes-styler/author/${id}`)
  return true
}

/**
 * * 명언 선택 함수
 * @param item - 아이템
 */
export function quotesSelector(item: ItemsType) {
  localStorage.setItem('selectedItem', JSON.stringify(item))
}

/**
 * * 로그아웃 함수
 */
export const logoutUser = async () => {

  try {
    const { status, meg } = await (await fetch('/api/auth/clear-token')).json()

    if (status === 200) alert(meg)
    sessionStorage.clear()
    window.location.reload()

  } catch (error) {
    console.error(error)
    alert('로그아웃에 실패하였습니다. 나중에 다시시도 해주세요.')
  }

}

/**
 * * 이미지 미리보기 주소(src)를 반환하는 함수
 * @param e ChangeEvent
 * @returns 이미지 주소를 반환(src)
 */
export const imagePreviewReader = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target && e.target.files) {
    try {
      const file = e.target.files[0]
      const src = URL.createObjectURL(file)
      return src
    } catch (error) {
      return false
    }
  }
}

// submit 브라우저 이벤트 방지
export const onSubmit = (e: FormEvent) => {
  e.preventDefault()
}

// 디바운스
function debounce() {
  let timerId: NodeJS.Timeout

  return function (
    newValue: number,
    targetName: string,
    state: any,
    setState: any,
    delayTime: number,
  ) {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      if (state === null) {
        setState(newValue)
      }
      if (state !== null) {
        setState({ ...state, [targetName]: newValue })
      }
    }, delayTime)
  }
}

// 디바운스 함수 호출 : debonce 함수의 클로저 반환하고 이를 활용.
/**
 * @argument newValue 새롭게 업데이트할 상태 값
 * @argument targetName 상태값의 타입 (타입이 필요 없으면 빈문자열<''> 을 전달한다.)
 * @argument state 기존 상태(기존상태가 필요없으면 null 을 전달한다.)
 * @argument setState 상태를 업데이트하는 함수
 * @argument delayTime 지연시간
 * @returns
 * @example  예를들어, debounceCloser(50, 'height',size, setSize,300) 와 같이 호출한다.
 */
export const debounceCloser = debounce()
