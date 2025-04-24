"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";
import InputDate from "../input/Date";
import Required from "../error/Required";

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

type FilteredBiodataType = {
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
  filtered: FilteredBiodataType;
  isAdded: any;
};

export default function Organisation({
  isAdded,
  theData,
  onOrganisationChange,
  filtered,
}: OrganisationProps) {
  const [organisation, setOrganisation] = useState<OrganisationType>(theData);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (theData) {
      setOrganisation(theData);
    }
  }, [theData]);

  const handleChange = (field: string, value: string) => {
    if (!added) {
      if (!Object.keys(organisation).includes(field)) return; // Mencegah field yang tidak valid

      const updatedOrganisation = {
        ...organisation,
        [field]: field.includes("date") ? new Date(value) : value, // ✅ Convert string to Date object
      };

      setOrganisation(updatedOrganisation);
      onOrganisationChange(updatedOrganisation);
      isAdded(false);
    } else {
      isAdded(true);
    }
  };

  const addOrganisation = () => {
    setAdded(!added);
  };

  return (
    <div className="space-y-[1rem]">
      <div className={`${added ? "" : "hidden"}`}>
        <h1 className="font-bold text-[1.5rem]">Isi Organisasi Data</h1>
        <div className="py-[2rem] text-[.9rem] space-y-[1rem]">
          <div className="space-y-[.5rem]">
            <Label name="Nama Organisasi" />
            <InputField name="organisation_name" onChange={handleChange} />
            <Required
              required="masukkan nama organisasi dulu"
              className={`${
                filtered.organisation_name === undefined ? "hidden" : "block"
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Alamat" />
            <InputField name="address" onChange={handleChange} />
            <Required
              required="masukkan alamat kampusmu"
              className={`${filtered.address === undefined ? "hidden" : ""}`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Type Organisasi" />
            <InputField name="type" onChange={handleChange} />
            <Required
              required="masukkan type dulu"
              className={`${filtered.type === undefined ? "hidden" : ""}`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Divisi" />
            <InputField name="division" onChange={handleChange} />
            <Required
              required="masukkan devisimu dulu"
              className={`${filtered.division === undefined ? "hidden" : ""}`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Tanggung Jawab" />
            <InputField name="responsibility" onChange={handleChange} />
            <Required
              required="masukkan tanggung jawab dulu"
              className={`${
                filtered.responsibility === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Tanggal Mulai" />
            <InputDate name="start_date" onChange={handleChange} />
            <Required
              required="masukkan tanggal masuk dulu"
              className={`${filtered.start_date === undefined ? "hidden" : ""}`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Tanggal Selesai" />
            <InputDate name="end_date" onChange={handleChange} />
            <Required
              required="masukkan tanggal selesai dulu"
              className={`${filtered.end_date === undefined ? "hidden" : ""}`}
            />
          </div>
        </div>
      </div>
      <button
        onClick={addOrganisation}
        className={`w-full h-[5rem] rounded-md border-[1.5px] border-dashed border-[#828282] justify-around flex align-middle items-center ${
          added ? "hover:bg-[#ffe9e9]" : "hover:bg-[#efe9ff]"
        } ease-in-out duration-500 cursor-pointer`}
      >
        <div>
          {added ? (
            <img src="/red-close.png" alt="" className="w-[1.5rem]" />
          ) : (
            <img src="/plus.png" alt="" className="w-[1.5rem]" />
          )}
        </div>
      </button>
    </div>
  );
}
