"use client"

import useAdmin from '@/custom/useAdmin';

import AdminWriteForm from '@/components/UI/admin/AdminWriteForm';
import ErrorMessage from '@/components/UI/message/ErrorMessage';

import { postFetcher } from '@/utils/fetcher';


export default function AuthorsManagementPage() {

    const fields = [
        {
            id: 'author',
            label: '인물 이름',
            type: 'input',
            name: 'author',
        },
        {
            id: 'job',
            label: '직업',
            type: 'input',
            name: 'job',
        },
        {
            id: 'birth',
            label: '출생-사망',
            type: 'input',
            name: 'birth',
        },
        {
            id: 'intro',
            label: '소개',
            type: 'textarea',
            name: 'intro',
        },

    ];

    const isPass = useAdmin()

    // 포스트 작성
    const addPostAction = async (form: FormData) => {
        const author = form.get('author')?.valueOf().toString();
        const job = form.get('job')?.valueOf().toString();
        const birth = form.get('birth')?.valueOf().toString();
        const intro = form.get('intro')?.valueOf().toString();
        const body = {
            job,
            birth,
            intro,
            author,
        }
        const url = `/api/admin/authors/update`
        const { meg } = await postFetcher(url, body)

        alert(meg)
    }

    if (!isPass) return <ErrorMessage title='접근 불가' message='관리자만 접근할 수 있습니다.'/>
    return (
        <AdminWriteForm addPostAction={addPostAction} fields={fields} formTitle='인물정보 등록' />
    )
}