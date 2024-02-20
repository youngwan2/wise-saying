import { renderHook } from '@testing-library/react'

import useHasToken from '../useHasToken'
import { expect, it } from 'vitest'
import { describe } from 'node:test'

describe('useHasToken', () => {
  it('sessionStorage 에 토큰이 존재한다면, validToken 의 상태가 true로 설정된다. ', () => {
    sessionStorage.setItem('token', 'Token')

    // result.current => {current: boolean}
    const { result } = renderHook(() => useHasToken())

    expect(result.current).toBeTruthy()
  })

  it('sessionStorage 에 토큰이 존재하지 않는다면, validToken 의 상태는 false 로 설정된다.', () => {
    sessionStorage.removeItem('token')
    const { result } = renderHook(() => useHasToken())

    expect(result.current).toBeFalsy()
  })
})
