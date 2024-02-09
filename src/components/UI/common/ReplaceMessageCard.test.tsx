import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import ReplaceMessageCard from './ReplaceMessageCard'
import { afterAll, describe, expect, it, vi } from 'vitest'

const { useRouter, mockedRouterPush } = vi.hoisted(() => {
  const mockedRouterPush = vi.fn()
  return {
    useRouter: () => ({ push: mockedRouterPush }),
    mockedRouterPush,
  }
})

vi.mock('next/navigation', async () => {
  const origin = await vi.importActual('next/navigation')
  return {
    ...origin,
    useRouter,
  }
})

describe('ReplaceMessageCard', () => {
  afterAll(() => {
    vi.resetAllMocks()
  })

  it('childeren prop 으로 전달된 "오류가 발생하였습니다." 텍스트가 노출된다.', () => {
    render(<ReplaceMessageCard childern="오류가 발생하였습니다." />)

    const h2 = screen.getByRole('heading', { level: 2 })
    expect(h2.textContent).toContain('오류가 발생하였습니다.')
  })

  it('"홈으로" 버튼을 클릭하면, "/" 경로로 useRouter 훅의 push 함수가 호출된다.', async () => {
    const user = userEvent.setup()

    render(<ReplaceMessageCard childern="오류가 발생하였습니다." />)

    const button = screen.getByText('홈으로')

    await user.click(button)

    expect(mockedRouterPush).toHaveBeenNthCalledWith(1, '/')
  })
})
