import React from "react";

interface TextAreaProps {
  name: string; // Add a name prop to identify the field
  value?: string;
  placeHolder?: string;
  onChange: (field: string, value: string) => void; // Ensure correct typing
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
  name,
  value,
  onChange,
  onKeyDown,
  placeHolder,
}: TextAreaProps) {
  return (
    <textarea
      className="w-full border-color-[#F6F6F6] border-[1px] rounded-[10px] h-[10rem] p-[1rem]"
      value={value} // Bind value to state
      placeholder={placeHolder}
      onChange={(e) => onChange(name, e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}
