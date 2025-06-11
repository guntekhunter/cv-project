import React from "react";

type DatePickerYearProps = {
  name: string;
  value?: string;
  onChange: (name: string, value: string) => void;
};

const currentYear = new Date().getFullYear();
const yearRange = Array.from({ length: 50 }, (_, i) => currentYear - i); // Last 50 years

export default function DatePickerYear({
  name,
  value,
  onChange,
}: DatePickerYearProps) {
  return (
    <select
      name={name}
      className="px-4 py-2 w-full border border-[#F6F6F6] rounded-[10px]"
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
    >
      <option value="">Pilih Tahun</option>
      {yearRange.map((year) => (
        <option key={year} value={String(year)}>
          {year}
        </option>
      ))}
    </select>
  );
}
