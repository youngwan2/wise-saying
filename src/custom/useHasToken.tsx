
"use client"
import {useEffect, useState} from 'react'

export default function useHasToken(){

const [validToken, setValidToken] = useState(false)


useEffect(()=>{
    if(localStorage.getItem('token')){
        setValidToken(true)
    }

    if(!localStorage.getItem('token')){
        setValidToken(false)
    }
},[])

return validToken

}