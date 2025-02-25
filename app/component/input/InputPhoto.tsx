import React from 'react'

interface InputPhotoProps {
    name: string;
    onChange: (field: string, value: string) => void;
}

export default function InputPhoto({ name, onChange }: InputPhotoProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = URL.createObjectURL(e.target.files[0]); // Convert file to URL for preview
            onChange(name, file);
        }
    };
    return (
        <div className="w-[30%] h-[10rem] rounded-[1rem] border-[1px] flex items-center justify-center relative">
            <input type="file"
                accept="image/*" className='absolute opacity-0 w-full h-full cursor-pointer' onChange={handleFileChange} />
        </div>
    )
}
