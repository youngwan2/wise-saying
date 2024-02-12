import { describe ,expect,it, vi} from "vitest";
import { pageSwitch } from "./commonFunctions";
import {
    AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';


const {useRouter } = vi.hoisted(()=>{
    const mockRouter:AppRouterInstance = {
        push: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        replace: vi.fn(),
        refresh: vi.fn(),
        prefetch: vi.fn(),
    }

    return {
        useRouter :() => ({mockRouter }),
        mockRouter
    }
})


vi.mock('next/navigation',async()=>{
    const origin = await vi.importActual('next/navigation')
    
    return {...origin, useRouter}
})

describe('pageSwisth 함수가 호출된다면', () => {
    
    it(' "/" 경로로 이동하고, result 는 true 를 반환해야 한다. ', () => {
        const router = useRouter().mockRouter
        const result = pageSwitch(router, 123)

        expect(router.push).toHaveBeenNthCalledWith(1,'/quotes-styler/author/123')
        expect(result).toBe(true)
    })

})