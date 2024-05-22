"use client"

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

import AdminWriteForm from '@/components/UI/admin/AdminWriteForm';

import { Method, getDefaultConfig } from '@/configs/config.api';
import { defaultFetch, postFetcher } from '@/utils/fetcher';
import ReplaceMessageCard from '@/components/UI/common/card/ReplaceMessageCard';


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


    const [isPass, setIsPass] = useState(false)

    function updateIsPass(success: boolean, setState: Dispatch<SetStateAction<boolean>>) {
        setState(success)
    }

    const userFetch = useCallback(async () => {
        const url = '/api/admin/auth'
        const config = getDefaultConfig(Method.GET, true)
        const { success } = await defaultFetch(url, config)

        updateIsPass(success, setIsPass)
    }, [])


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

    useEffect(() => {
        userFetch()
    }, [userFetch])

    if(!isPass) return <ReplaceMessageCard childern='접근 권한이 없습니다.'/>
    return (
        <AdminWriteForm addPostAction={addPostAction} fields={fields} formTitle='인물정보 등록' />
    )
}