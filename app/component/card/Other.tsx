"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";
import DropDown from "../input/DropDown";

type OtherType = {
  type: string;
  name: string;
  year: string;
  cv_id: number;
};

type OtherProps = {
  theData: OtherType;
  onOtherChange: (updatedOtherMedia: OtherType) => void;
};

export default function Other({ theData, onOtherChange }: OtherProps) {
  const [other, setOther] = useState<OtherType>(theData);

  useEffect(() => {
    if (theData) {
      setOther(theData);
    }
  }, [theData]);

  const handleChange = (field: string, value: string) => {
    if (!Object.keys(other).includes(field)) return; // Mencegah field yang tidak valid

    const updatedOther = { ...other, [field]: value };
    setOther(updatedOther);
    onOtherChange(updatedOther);
  };

  return (
    <div className="space-y-[1rem]">
      <h1 className="font-bold text-[1.5rem]">Isi Sosial Media</h1>
      <div className="py-[2rem] text-[.9rem] space-y-[1rem]">
        <div className="space-y-[.5rem]">
          <Label name="Skill/Hobi/Sertifikat" />
          <DropDown
            name="type"
            options={[
              { label: "Hard Skills", value: "hard_skils" },
              { label: "Soft Skills", value: "soft_skils" },
              { label: "Sertifikat", value: "certificate" },
              { label: "Hobi", value: "hoby" },
            ]}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Nama Skill" />
          <InputField name="name" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Tahun" />
          <InputField name="year" onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
