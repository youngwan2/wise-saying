"use client"

import useAdmin from '@/custom/useAdmin';

import ErrorMessage from '@/components/UI/message/ErrorMessage';
import AdminWriteForm from '@/components/UI/admin/AdminWriteForm';

import {  postFetcher } from '@/utils/fetcher';


export default function QuotesManagementPage() {


  const fields = [
    {
      id: 'category',
      label: '카테고리',
      type: 'input',
      name: 'category',
    },
    {
      id: 'content',
      label: '내용',
      type: 'textarea',
      name: 'content',
    },
    {
      id: 'author',
      label: '작성자',
      type: 'input',
      name: 'author',
    }
  ];

  const isPass = useAdmin()


  // 포스트 작성
  const addPostAction = async (form: FormData) => {
    const quote = form.get('content')?.valueOf().toString();
    const category = form.get('category')?.valueOf().toString();
    const author = form.get('author')?.valueOf().toString();
    const body = {
      quote,
      category,
      author
    }
    const url = `/api/admin/quotes/create`
    const { meg } = await postFetcher(url, body)

    alert(meg)
  }

  if (!isPass) return <ErrorMessage title='접근 불가' message='관리자만 접근할 수 있습니다.'/>
  return (
    <AdminWriteForm addPostAction={addPostAction} fields={fields} formTitle={'명언 등록'} />
  )
}

