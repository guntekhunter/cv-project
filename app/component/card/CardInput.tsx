"use client"
import React from 'react'
import Label from '../input/Label'
import InputPhoto from '../input/InputPhoto'
import InputField from '../input/InputField'
import TextArea from '../input/TextArea'
import MainButton from '../buttons/MainButton'
import Biodata from './Biodata'

export default function CardInput() {
    const handleButton = () => {
        console.log("bisa ini")
    }
    return (
        <div className='space-y-[1rem]'>
            <Biodata />
            <MainButton onClick={handleButton} />
        </div>
    )
}
