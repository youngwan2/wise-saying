// __mocks__/zustand.ts
import * as zustand from 'zustand'
import { act } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

const { create: actualCreate, createStore: actualCreateStore } =
  await vi.importActual<typeof zustand>('zustand')

// 앱에 선언된 모든 스토어에 대한 재설정 기능을 포함하는 함수
export const storeResetFns = new Set<() => void>()

const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator)
  const initialState = store.getInitialState()
  storeResetFns.add(() => {
    store.setState(initialState, true)
  })
  return store
}

// 스토어 생성 초기 상태를 얻고, 재설정 기능을 생성하여 set 에 추가한다.
export const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
  console.log('zustand create mock')

  // 카레 버전(시험 버전)의 create 함수 지원
  return typeof stateCreator === 'function'
    ? createUncurried(stateCreator)
    : createUncurried
}) as typeof zustand.create

const createStoreUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreateStore(stateCreator)
  const initialState = store.getInitialState()
  storeResetFns.add(() => {
    store.setState(initialState, true)
  })
  return store
}

// 스토어 생성 시 초기 상태를 얻고, 재설정 기능 생성 후 세트에 추가
export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
  console.log('zustand createStore mock')

  // 커리 버전 지원용 분기처리
  return typeof stateCreator === 'function'
    ? createStoreUncurried(stateCreator)
    : createStoreUncurried
}) as typeof zustand.createStore

// 테스트 실행 후 매번 스토어를 초기 상태로 되돌림
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => { // zustand 목 초기화(실행 전 상태로 되돌림)
      resetFn()
    })
  })
})