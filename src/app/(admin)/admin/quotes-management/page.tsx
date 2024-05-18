"use client"

import AdminWriteForm from '@/components/UI/admin/AdminWriteForm';
import ReplaceMessageCard from '@/components/UI/common/ReplaceMessageCard';
import { Method, getDefaultConfig } from '@/configs/config.api';
import { defaultFetch, postFetcher } from '@/utils/fetcher';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

export default function QuotesManagementPage() {

    const [isPass, setIsPass] = useState(false)

    function updateIsPass(success:boolean, setState:Dispatch<SetStateAction<boolean>>){
        setState(success)
    }

    const userFetch = useCallback(async() =>{
        const url = '/api/admin/auth'
        const config = getDefaultConfig(Method.GET, true)
        const {success} = await defaultFetch(url, config)

        updateIsPass(success, setIsPass)
    },[])

    useEffect(() => {
        userFetch()
    }, [userFetch ])


    // 포스트 작성
    const addPostAction = async (form: FormData) => {
        const quote = form.get('content')?.valueOf().toString();
        const category = form.get('category')?.valueOf().toString();
        const author = form.get('author')?.valueOf().toString();
        const body = {
            quote,
            category,
            author,
            isAdmin: 'TRUE'
        }
        const url = `/api/admin/quotes/create`
        const result = await postFetcher(url, body)
        console.log(result)
    }

    if(!isPass) return <ReplaceMessageCard childern='접근 권한이 없습니다.'/>
    return (
        <AdminWriteForm addPostAction={addPostAction} />
    )
}