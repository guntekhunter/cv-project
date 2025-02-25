import React from 'react'

interface InputFieldProps {
    name: string; // Field name to identify the input
    value?: string;
    onChange: (field: string, value: string) => void;
}

export default function InputField({ name, value, onChange }: InputFieldProps) {
    return (
        <input className='px-[1rem] py-[.5rem] w-full border-color-[#F6F6F6] border-[1px] rounded-[10px]' value={value}
            onChange={(e) => onChange(name, e.target.value)} />
    )
}
