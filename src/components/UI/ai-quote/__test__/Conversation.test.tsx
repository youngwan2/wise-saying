import { render, screen } from '@testing-library/react'
import useEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import ConversationCard from '../ConversationCard'



/** 대화 카드 단위 테스트 */
describe('ConversationCard', () => {

    const onLoadScrollEnd = vi.fn()
    const onSetText =vi.fn()

    // Conversation 컴포넌트에 전달할 props 모의
    const defaultProps = {
        onLoadScrollEnd: onLoadScrollEnd,
        onSetText: onSetText,
        profileImage:'/images/user-icon.png',
        conversation: 
            {
                quote: '인공지능 응답',
                role: 'ai',
                category: '',
                created_at: '2024-01-01',
            }
    }

    // 프로필 
    describe('Image',()=>{

        it('props 로 전달된 coversation.role 이 ai 인 경우, src 는 "/images/ai-icon.png" 이 된다.',()=>{
            render(<ConversationCard {...defaultProps} />)

            const img = screen.getByRole('img') as HTMLImageElement

            expect(img.src).toMatch(/ai-icon.png/)

        })

        it('props 로 전달된 conversation.role 이 ai 가 아니라면, src 는 user-profile.png 가 된다.',()=> {

            const defaultProps = {
                onLoadScrollEnd: onLoadScrollEnd,
                onSetText: onSetText,
                profileImage:'/images/user-icon.png',
                conversation: 
                    {
                        quote: '인공지능 응답',
                        role: '',
                        category: '',
                        created_at: '2024-01-01',
                    }
            }
            render(<ConversationCard {...defaultProps} />)

            const img = screen.getByRole('img') as HTMLImageElement

            expect(img.src).toMatch(/user-icon.png/)

        })
    })


    // 명언
    it('quote 텍스트의 길이 만큼 span 요소가 렌더링된다.', () => {
        render(<ConversationCard {...defaultProps} />)

        const spanElements = screen.getAllByTestId('quote')
        const spanLength = spanElements.length

        expect(spanLength).toBe(7)
    })

    // 명언 카테고리
    describe('Category',()=>{

        it('props로 전달된 conversation.category 가 빈 문자열이라면 span 요소는 렌더링 되지 않는다.',()=>{
            render(<ConversationCard {...defaultProps} />)
    
          const categorySpan = screen.queryByTestId('category')
          
          expect(categorySpan).toBeNull()
        })
    
        
        it('props로 전달된 conversation.category 가 빈 문자열이 아니라면 span 요소는 렌더링 된다.',()=>{
            const defaultProps = {
                onLoadScrollEnd: onLoadScrollEnd,
                onSetText: onSetText,
                profileImage:'',
                conversation: 
                    {
                        quote: '인공지능 응답',
                        role: 'ai',
                        category: '동기부여',
                        created_at: '2024-01-01',
                    }
            }
            render(<ConversationCard {...defaultProps} />)
    
          const categorySpan = screen.queryByTestId('category')
          
          expect(categorySpan?.textContent).toBe(defaultProps.conversation.category)
        })
    })

    // 명언 듣기 함수
    describe('onSetText',()=>{

        it('props 로 전달된 conversation.role 이 ai 일 때, onSetText 함수가 정상적으로 호출된다.',async ()=>{

            render(<ConversationCard {...defaultProps} />)
    
            const button = screen.getByRole('button')
            await useEvent.click(button)
    
            expect(defaultProps.onSetText).toHaveBeenCalledOnce()
        })
    
        it('props 으로 전달된 conversation.role 이 ai 가 아닌 경우, button 은 렌더링 되지 않는다.', async()=>{
            const defaultProps = {
                onLoadScrollEnd: onLoadScrollEnd,
                onSetText: onSetText,
                profileImage:'',
                conversation: 
                    {
                        quote: '인공지능 응답',
                        role: 'user',
                        category: 'Motivation',
                        created_at: '2024-01-01',
                    }
            }
            
            render(<ConversationCard {...defaultProps} />)
    
            expect(screen.queryByRole('button')).toBeNull()
        })


    })
})



    // // useTTS 커스텀 훅 모의
    // vi.mock('@/custom/useTTS', async (importOrigin)=> {
    //     const mod = await importOrigin<typeof import('@/custom/useTTS')>()
    //     return {
    //         ...mod,
    //         setText: vi.fn()
    //     }
    // })
    // // getUserInfo 함수 모의
    // const getUserInfo = vi.fn((mockReturnValue) => mockReturnValue)

    // // getUserInfo 를 통해 반환되는 값 모의
    // const mockUserInfo: UserInfoType = {
    //     dbEmail: '',
    //     profile: {
    //         nickname: '',
    //         image: '/images/user-icon.png',
    //     },
    // }

    // beforeEach(() => {
    //     vi.clearAllMocks()
    //     // getUserInfo 함수를 호출하면 앞서 mockUserInfo 를 반환
    //     getUserInfo.mockReturnValue(mockUserInfo) 
    // })