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
          <InputField
            name="organisation"
            value={organisation.organisation_name ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Alamat" />
          <InputField
            name="alamat"
            value={organisation.address ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Type Organisasi" />
          <InputField
            name="tipe"
            value={organisation.type ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Tanggung Jawab" />
          <InputField
            name="tanggung-jawab"
            value={organisation.responsibility ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Tanggal Mulai" />
          <InputDate
            name="mulai"
            value={
              organisation.start_date
                ? organisation.start_date.toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Tanggal Selesai" />
          <InputDate
            name="selesai"
            value={
              organisation.end_date
                ? organisation.end_date.toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
