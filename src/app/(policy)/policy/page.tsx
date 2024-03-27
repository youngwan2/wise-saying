"use client"

import BackMoveButton from "@/components/UI/common/BackMoveButton";
import PolicyTaps from "@/components/UI/policy/PolicyTaps";
import PrivacyPolicy from "@/components/UI/policy/PrivacyPolicy";
import PrivacyPolicyConsent from "@/components/UI/policy/PrivatePolicyConsent";
import TermsConditions from "@/components/UI/policy/TermsConditions";
import { usePolicyTaps } from "@/store/store";

export default function PolicyPage(){

    const tapNum = usePolicyTaps((state)=> state.tapNum)
    const setTapNum = usePolicyTaps((state)=> state.setTapNum)

    function onClickChangeTap(num:number){
        setTapNum(num)
    }
    
    return(
        <>
        <BackMoveButton/>
            <PolicyTaps tapNum ={tapNum} onClickChangeTap={onClickChangeTap}/>
            {tapNum === 0 && <TermsConditions/> } 
            {tapNum === 1 && <PrivacyPolicy/> } 
            {tapNum === 2 && <PrivacyPolicyConsent/> } 
        </>
    )
}