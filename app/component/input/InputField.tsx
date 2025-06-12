import React from "react";

interface InputFieldProps {
  name: string; // Field name to identify the input
  value?: string;
  onChange: (field: string, value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputField({
  name,
  value,
  onChange,
  onKeyDown,
}: InputFieldProps) {
  return (
    <input
      className="px-[1rem] py-[.5rem] w-full border-color-[#F6F6F6] border-[1px] rounded-[10px]"
      value={value}
      onKeyDown={onKeyDown}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
}
