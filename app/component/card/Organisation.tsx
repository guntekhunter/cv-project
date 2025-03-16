"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";
import InputDate from "../input/Date";

type OrganisationType = {
  organisation_name: string;
  address: string;
  division: string;
  type: string;
  responsibility: string;
  start_date: Date;
  end_date: Date;
  cv_id: number;
};

type OrganisationProps = {
  theData: OrganisationType;
  onOrganisationChange: (updatedBiodata: OrganisationType) => void;
};

export default function Organisation({
  theData,
  onOrganisationChange,
}: OrganisationProps) {
  const [organisation, setOrganisation] = useState<OrganisationType>(theData);

  useEffect(() => {
    if (theData) {
      setOrganisation(theData);
    }
  }, [theData]);

  const handleChange = (field: string, value: string) => {
    if (!Object.keys(organisation).includes(field)) return; // Mencegah field yang tidak valid

    const updatedOrganisation = {
      ...organisation,
      [field]: field.includes("date") ? new Date(value) : value, // ✅ Convert string to Date object
    };

    setOrganisation(updatedOrganisation);
    onOrganisationChange(updatedOrganisation);
  };

  return (
    <div className="space-y-[1rem]">
      <h1 className="font-bold text-[1.5rem]">Isi Organisasi Data</h1>
      <div className="py-[2rem] text-[.9rem] space-y-[1rem]">
        <div className="space-y-[.5rem]">
          <Label name="Nama Organisasi" />
          <InputField name="organisation_name" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Alamat" />
          <InputField name="address" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Type Organisasi" />
          <InputField name="type" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Divisi" />
          <InputField name="division" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Tanggung Jawab" />
          <InputField name="responsibility" onChange={handleChange} />
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
