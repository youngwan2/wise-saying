'use client'

import useHasToken from '@/custom/useHasToken';
import { useRouter } from 'next/navigation';
import { ImExit } from "react-icons/im";

export default function LogoutButton() {
    const router = useRouter()
    const hasToken = useHasToken()
    if (!hasToken) return <></>
    return (
        <button
            onClick={() => {
                router.push('/logout')
            }}
            className="text-[1.5em] p-[0.4em] mt-[0.25em] hover:shadow-[0_0_0_1px_rgba(888,888,888,0.3)]"
        >
            <ImExit />
        </button>
    )
}
