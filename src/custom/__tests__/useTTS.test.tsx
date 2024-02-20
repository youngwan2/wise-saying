import { act, renderHook } from '@testing-library/react'

import useTTS from '../useTTS'
import { afterAll, expect, it, vi } from 'vitest'
import { describe } from 'node:test'

//copyprogramming.com/howto/testing-failure-referenceerror-speechsynthesisutterance-is-not-defined

https: afterAll(() => {
  vi.resetAllMocks()
})

describe('useTTS', () => {
  it('setText() 가 정상적으로 호출된다면, text 에 임의의 텍스트가 할당된다. ', () => {
    const { result } = renderHook(useTTS)

    act(() => {
      result.current.setText('가는 말이 고와야 오늘 말도 곱다.')
    })
    console.log('result.currnet:', result.current)
    expect(result.current.text).toBe('가는 말이 고와야 오늘 말도 곱다.')
  })

  it('setText 함수를 호출할 때 TTS API가 호출되는지 확인한다.', () => {
    const mockSpeakTextSpy = vi.fn()

    if (window['speechSynthesis'] === undefined) return
    window.speechSynthesis = {
      speak: mockSpeakTextSpy,
      onvoiceschanged: vi.fn(),
      paused: false,
      pending: false,
      speaking: false,
      cancel: vi.fn(),
      getVoices: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      addEventListener,
      removeEventListener,
      dispatchEvent,
    }

    const { result } = renderHook(() => useTTS())

    act(() => {
      result.current.setText('테스트할 텍스트')
    })

    expect(mockSpeakTextSpy).toHaveBeenCalledWith('테스트할 텍스트')
  })
})
