import React from 'react'
import Input from '../input/InputField'
import InputField from '../input/InputField'
import Label from '../input/Label'
import MainButton from '../buttons/MainButton'
import TextArea from '../input/TextArea'

export default function Biodata() {
    return (
        <div className='space-y-[1rem]'>
            <h1 className='font-bold text-[1.5rem]'>Isi Biodata</h1>
            <div className="py-[2rem] text-[.9rem] space-y-[1rem]">
                <div className='space-y-[.5rem]'>
                    <Label name="Foto" />
                    <InputField />
                </div>
                <div className='space-y-[.5rem]'>
                    <Label name="Nama" />
                    <InputField />
                </div>
                <div className='space-y-[.5rem]'>
                    <Label name="Website/Portofolio" />
                    <InputField />
                </div>
                <div className='space-y-[.5rem]'>
                    <Label name="Deskripsi Diri *" />
                    <TextArea />
                </div>
                <MainButton />
            </div>

        </div>
    )
}
