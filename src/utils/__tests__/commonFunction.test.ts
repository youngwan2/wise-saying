import { beforeEach, describe, expect, it, vi } from 'vitest'
import { debounceCloser, pageSwitch } from '../common-func'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { afterEach } from 'node:test'

const { useRouter } = vi.hoisted(() => {
  const mockRouter: AppRouterInstance = {
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }

  return {
    useRouter: () => ({ mockRouter }),
    mockRouter,
  }
})

vi.mock('next/navigation', async () => {
  const origin = await vi.importActual('next/navigation')

  return { ...origin, useRouter }
})

describe('pageSwisth function', () => {
  it(' "/" 경로로 이동하고, result 는 true 를 반환해야 한다. ', () => {
    const router = useRouter().mockRouter
    const result = pageSwitch(router, 123)

    expect(router.push).toHaveBeenNthCalledWith(1, '/quotes-styler/author/123')
    expect(result).toBe(true)
  })
})

describe('debunce function', () => {
  beforeEach(() => {
    vi.useFakeTimers() // 각 테스트 실행 전에 타이머를 모킹한다(vitest 에게 타이머 모킹을 적용할 것임을 알림 ).
  })

  afterEach(() => {
    vi.useRealTimers() // 각 테스트 마다 타이머 모킹을 실행 전 상태로 초기화 한다.
  })

  vi.useFakeTimers() // 타이머 모킹(이후 useRealTimers 호출 전 까지 모든 타이퍼를 래핑)

  it('특정 시간이 지나면, 함수가 호출된다.', () => {
    const spySetState = vi.fn()
    debounceCloser(42, 'width', null, spySetState, 500)

    vi.advanceTimersByTime(500)
    expect(spySetState).toHaveBeenCalled()
  })
})
