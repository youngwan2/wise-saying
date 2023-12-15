"use client"
import Nav from "./Nav";
import {useState} from 'react'
export default function SubHeader(){

    const [title, setTitle] = useState('')
    return (
            <Nav/>
    )
}