"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";
import InputDate from "../input/Date";
import DropDown from "../input/DropDown";

type EducationType = {
  school_name: string;
  major: string;
  ipk: string;
  education_type: string;
  school_address: string;
  start_date: Date;
  end_date: Date;
  cv_id: number;
};

type EducationProps = {
  theData: EducationType;
  onEducationChange: (updatedBiodata: EducationType) => void;
};

export default function Education({
  theData,
  onEducationChange,
}: EducationProps) {
  const [education, setEducation] = useState<EducationType>(theData);

  useEffect(() => {
    if (theData) {
      setEducation(theData);
    }
  }, [theData]);

  const handleChange = (field: string, value: string) => {
    if (!Object.keys(education).includes(field)) return; // Mencegah field yang tidak valid

    const updatedEducation = {
      ...education,
      [field]: field.includes("date") ? new Date(value) : value, // ✅ Convert string to Date object
    };

    setEducation(updatedEducation);
    onEducationChange(updatedEducation);
  };

  return (
    <div className="space-y-[1rem]">
      <h1 className="font-bold text-[1.5rem]">Riwayat Pekerjaan</h1>
      <div className="py-[2rem] text-[.9rem] space-y-[1rem]">
        <div className="space-y-[.5rem]">
          <Label name="Nama Sekolah/Universitas" />
          <InputField name="school_name" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Jurusan" />
          <InputField name="major" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Ipk/Nilai" />
          <InputField name="ipk" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Pilih Jenjang" />
          <DropDown
            name="education_type"
            options={[
              { label: "SD", value: "sd" },
              { label: "SMP", value: "smp" },
              { label: "SMA", value: "sma" },
              { label: "UNIVERSITAS", value: "universitas" },
            ]}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Alamat Sekolah" />
          <InputField name="school_address" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Tanggal Mulai" />
          <InputDate name="start_date" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Tanggal Selesai" />
          <InputDate name="end_date" onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
