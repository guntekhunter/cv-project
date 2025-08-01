import React from "react";

interface InputFieldProps {
  name: string; // Field name to identify the input
  placeHolder: string; // Field name to identify the input
  value?: string;
  type?: string;
  onChange: (field: string, value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputField({
  name,
  placeHolder,
  value,
  onChange,
  onKeyDown,
  type,
}: InputFieldProps) {
  return (
    <input
      className="px-[1rem] py-[.5rem] w-full border-color-[#F6F6F6] border-[1px] rounded-[10px]"
      value={value}
      placeholder={placeHolder}
      type={type || "text"}
      onKeyDown={onKeyDown}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
}
