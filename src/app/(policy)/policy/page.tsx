"use client"

import PolicyTaps from "@/components/UI/policy/PolicyTaps";
import PrivacyPolicy from "@/components/UI/policy/PrivacyPolicy";
import TermsConditions from "@/components/UI/policy/TermsConditions";
import { useState } from "react";

export default function PolicyPage(){

    const [tapNum, setTapNum] = useState(0)

    function onClickChangeTap(num:number){
        setTapNum(num)
    }
    
    return(
        <>
            <PolicyTaps tapNum ={tapNum} onClickChangeTap={onClickChangeTap}/>
            {tapNum === 0 && <TermsConditions/> } 
            {tapNum === 1 && <PrivacyPolicy/> } 
        </>
    )
}