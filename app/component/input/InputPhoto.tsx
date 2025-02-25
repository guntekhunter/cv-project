import React from 'react'

interface InputPhotoProps {
    name: string;
    onChange: (field: string, value: string) => void;
}

export default function InputPhoto({ name, onChange }: InputPhotoProps) {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                onChange(name, reader.result as string); // Pastikan value adalah string
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="w-[30%] h-[10rem] rounded-[1rem] border-[1px] flex items-center justify-center relative">
            <input type="file"
                accept="image/*" className='absolute opacity-0 w-full h-full cursor-pointer' onChange={handleFileChange} />
        </div>
    )
}
