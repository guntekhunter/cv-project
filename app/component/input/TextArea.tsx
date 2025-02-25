import React from 'react'

interface TextAreaProps {
    name: string; // Add a name prop to identify the field
    value?: string;
    onChange: (field: string, value: string) => void; // Ensure correct typing
}

export default function TextArea({ name, value, onChange }: TextAreaProps) {
    return (
        <textarea className='w-full border-color-[#F6F6F6] border-[1px] rounded-[10px] h-[10rem] p-[1rem]' value={value} // Bind value to state
            onChange={(e) => onChange(name, e.target.value)} />
    )
}
