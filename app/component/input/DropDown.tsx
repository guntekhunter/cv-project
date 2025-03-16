import React from "react";

interface DropDownProps {
  name: string;
  value?: string;
  options: { label: string; value: string }[];
  onChange: (field: string, value: string) => void;
}

export default function DropDown({
  name,
  value,
  options,
  onChange,
}: DropDownProps) {
  return (
    <select
      className="px-[1rem] py-[.5rem] w-full border border-[#F6F6F6] rounded-[10px]"
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
