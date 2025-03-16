"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";
import InputDate from "../input/Date";
import DropDown from "../input/DropDown";

type JobType = {
  company_name: string;
  company_address: string;
  responsibility: string;
  company_description: string;
  job_type: string;
  start_date: Date;
  end_date: Date;
  cv_id: number;
};

type JobProps = {
  theData: JobType;
  onJobChange: (updatedBiodata: JobType) => void;
};

export default function Job({ theData, onJobChange }: JobProps) {
  const [job, setJob] = useState<JobType>(theData);

  useEffect(() => {
    if (theData) {
      setJob(theData);
    }
  }, [theData]);

  const handleChange = (field: string, value: string) => {
    if (!Object.keys(job).includes(field)) return; // Mencegah field yang tidak valid

    const updatedJob = {
      ...job,
      [field]: field.includes("date") ? new Date(value) : value, // ✅ Convert string to Date object
    };

    setJob(updatedJob);
    onJobChange(updatedJob);
  };

  return (
    <div className="space-y-[1rem]">
      <h1 className="font-bold text-[1.5rem]">Riwayat Pekerjaan</h1>
      <div className="py-[2rem] text-[.9rem] space-y-[1rem]">
        <div className="space-y-[.5rem]">
          <Label name="Nama Perusahaan" />
          <InputField name="company_name" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Alamat Perusahaan" />
          <InputField name="company_address" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Pekerjaan" />
          <InputField name="responsibility" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Deskripsi Perusahaan" />
          <InputField name="company_description" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Tipe Pekerjaan" />
          <DropDown
            name="job_type"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
            onChange={handleChange}
          />
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
