"use client"

import React from 'react';
import EditorCanvas from '../_components/EditorCanvas';
import Container from '@/components/UI/common/container/Container';


export default function page() {

    return (
        <Container elementName={"section"} className='h-[100vh]'>
            <EditorCanvas />
        </Container>
    )
}



