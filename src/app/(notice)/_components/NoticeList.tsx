import EmptyMessage from '@/components/UI/message/EmptyMessage';
import NoticeListItem from './NoticeListItem';

import type { NoticeType } from '../_types/notice.types';




const NOTICE_TITLE_INDEX = 0
export default function NoticeList({ notices }: Pick<NoticeType, 'notices'>) {

    if (notices?.length < 1) return <EmptyMessage title='공지시항이 없습니다.' message='현재 등록된 공지사항이 없습니다.'/>
    return ( 
        <ul className='p-5 px-1'>
            {notices.map((notice, i) => {
                const createdAt = new Date(notice.created_at).toLocaleDateString()
                const title = notice.content.blocks[NOTICE_TITLE_INDEX].data.text
                const { notice_id: id, name } = notice

                return <NoticeListItem id={id} name={name} createdAt={createdAt} title={title} />
            }
            )}
        </ul>
    )
}