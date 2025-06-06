import React from "react";

type InputDateProps = {
  name: string;
  value?: string; // ✅ Expect a string here
  onChange: (name: string, value: string) => void;
};

export default function InputDate({ name, value, onChange }: InputDateProps) {
  return (
    <input
      type="date"
      className="px-[1rem] py-[.5rem] w-full border-color-[#F6F6F6] border-[1px] rounded-[10px]"
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
}
