import Home from '@/app/page'
import { afterEach, expect, vi, describe, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'


vi.mock('@/services/data/get', () => {
    return vi.fn().mockImplementation(() => Promise.resolve([
        {
            id: 1,
            author: '테스터',
            quote:'모킹 테스트'
    }
    ]))
})

describe('Home', () => {
    it('오늘의 명언 목록을 렌더링하여야 한다.', async()=>{
        const {getByText} = render(<Home/>)

        await waitFor(() => getByText(/모킹 테스트/i))

        expect(getByText(/모킹 테스트/i).textContent).toBe('모킹 테스트')

    })

})