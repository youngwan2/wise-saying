import { Method, getDefaultConfig } from '@/configs/config.api'
import { ItemsType } from '@/types/items.types'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { FormEvent } from 'react'
import {toast} from 'react-toastify'

interface MapType {
  [topick: string]: string
}
export function categoryClassifier(category: string): string {
  const categoryMap: MapType = {
    authors: '인물별',
    topics: '주제별',
    job: '직업별',
  }

  const target = categoryMap[category]
  return target
}

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
 * * 로그아웃
 */
export const logoutUser = async () => {
  const url = '/api/auth/general-auth/clear-token'
  const config = getDefaultConfig(Method.GET, false)
  try {
    const respone = await fetch(url, config)
    const { success, meg } = await respone.json()

    if (success) {
      toast.success(meg)
      sessionStorage.clear()
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
    if (!success) toast.error(meg)
  } catch (error) {
    console.error('로그아웃 요청 실패:', error)
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
