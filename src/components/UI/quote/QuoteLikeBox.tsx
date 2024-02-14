'use client'

import { getAccessToken } from "@/utils/sessionStorage";
import { useCallback, useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi2";

interface PropsType {
    id: string
}


export default function QuoteLikeBox({ id }: PropsType) {
    const [likeCount, setLikeCount] = useState(0)
    const [quoteId, setQuoteId] = useState(0)
    const onClickHandleLikeClick = () => {
        const token = getAccessToken() || ''
        if (token.length < 2) return
        const url = '/api/quotes/' + id + '/like'
        const config = {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        fetch(url, config).then((response) => {
            return response.json()
        }).then((result) => {
            const { meg, status, likeCount, quoteId } = result
            if (status === 201) {
                setLikeCount(likeCount)
                setQuoteId(quoteId)
            }
            else alert(meg)

        }).catch(error => {
            console.error('좋아요 클릭 에러:', error)
        })
    }

    const getLikeCountFormDB = useCallback(() => {
        const url = '/api/quotes/' + id + '/like'
        fetch(url)
            .then((response) => { return response.json() })
            .then((result) => {
                const { likeCount, quoteId } = result
                setLikeCount(likeCount)
                setQuoteId(quoteId)
            })
            .catch((error) => {
                console.error('좋아요 갯수 조회 에러:', error)
            })
    }, [id])


    const showLikeCountQuoteIdMatch = Number(quoteId) === Number(id)

    useEffect(() => {
        getLikeCountFormDB()
    }, [getLikeCountFormDB])



    return (
        <article className="absolute bottom-3 left-[43%] transform-x-[-50%] hover:shadow-[0_0_15px_3px_tomato] rounded-[10px] transition-shadow ">
            <button onClick={onClickHandleLikeClick} className="text-[1.2em] flex items-center px-[15px] rounded-[10px] relative bg-[#fa5669]">
                <HiHeart /><span className="mx-[2px]"> {showLikeCountQuoteIdMatch ? likeCount : 0}</span>
                <span className="border-b-[5px] border-l-[10px] border-r-[10px] border-transparent border-t-[10px] border-t-[#fa5669] bottom-[-0.8em] left-[50%] translate-x-[-50%] absolute"></span>
            </button>
        </article>
    )
}