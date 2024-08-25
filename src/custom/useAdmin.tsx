// interface PropsType { }

import { Method, getDefaultConfig } from "@/configs/config.api"
import { defaultFetch } from "@/utils/fetcher"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"


export default function useAdmin() {


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

    useEffect(() => {
        userFetch()
    }, [userFetch])

    return isPass

}