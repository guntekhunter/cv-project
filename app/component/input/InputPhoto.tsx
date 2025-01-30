import React from 'react'

export default function InputPhoto(props: any) {
    return (
        <div className="w-[30%] h-[10rem] rounded-[1rem] border-[1px] flex items-center justify-center relative">
            <input type="file" className='absolute opacity-0 w-full h-full cursor-pointer' />
        </div>
    )
}
