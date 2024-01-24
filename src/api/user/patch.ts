import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

interface UserPostType {
    category: FormDataEntryValue
    content: FormDataEntryValue
    author: FormDataEntryValue
    
}

export const updateUserPost = async (postId:number, hasToken: boolean, router: AppRouterInstance, userPost: UserPostType) => {
    if (!hasToken) {
        alert('로그인 해주세요')
        router.push('/login')
    }
    const { category, content, author } = userPost
    if (category.toString().length < 1)
        return alert(`주제를 최소 2자 이상 적어 주세요.`)
    if (content.toString().length < 3)
        return alert(`내용을 최소 3자 이상 적어 주세요.`)
    if (author.toString().length <= 2)
        return alert('작성자를 최소 2자 이상 적어주세요.')

    const accessToken = localStorage.getItem('token')
    const headers = {
        'authorization': `Bearer ${accessToken}`,
    }

    const body = { category, content, author }

    const response = await fetch(`/api/quotes/users/post/${postId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body),
    })

    const { status, meg } = await response.json()
    if (status === 201) {
        alert(meg)
        router.push('/user-quotes')
        setTimeout(() => {
            location.reload()
        }, 1000)

        if (status !== 201) {
            const isSave = confirm("현재 작성한 내용을 임시 저장 하시겠습니까?")
            if (isSave) {
                localStorage.setItem('savaPost', JSON.stringify(body))
            }

        }
    }
}