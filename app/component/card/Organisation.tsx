"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";
import InputDate from "../input/Date";
import Required from "../error/Required";
import Button from "../buttons/Button";
import { addOrganisation } from "@/app/fetch/add/fetch";
import UploadSuccess from "../modal/UploadSuccess";
import UploadRequired from "../modal/UploadRequired";
import { getOrganisations } from "@/app/fetch/get/fetch";

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
  adding: boolean;
  onAddedChange: (val: boolean) => void;
};

export default function Organisation({
  adding,
  onAddedChange,

  theData,
  onOrganisationChange,
  filtered,
}: OrganisationProps) {
  const [organisation, setOrganisation] = useState<OrganisationType>(theData);
  const [organisations, setOrganisations] = useState([]);
  const [added, setAdded] = useState(false);
  const [filteredOrganisation, setFilteredOrganisation] = useState<any>({});
  const [status, setStatus] = useState(false);
  const [required, setRequired] = useState(false);

  useEffect(() => {
    if (theData) {
      setOrganisation(theData);
    }
  }, [theData]);

  const handleChange = (field: string, value: string) => {
    if (!added) {
      console.log("aih");
    } else {
      if (!Object.keys(organisation).includes(field)) return; // Mencegah field yang tidak valid
      const updatedOrganisation = {
        ...organisation,
        [field]: field.includes("date") ? new Date(value) : value, // ✅ Convert string to Date object
      };

      setOrganisation(updatedOrganisation);
      onOrganisationChange(updatedOrganisation);
      // isAdded(true);
    }
  };

  const addingOrganisation = () => {
    setAdded(!added);
    const newAdd = !added;
    onAddedChange(newAdd);
    const updatedOrganisation = {
      ...theData,
      address: "", // ✅ Convert string to Date object
      responsibility: "", // ✅ Convert string to Date object
      organisation_name: "", // ✅ Convert string to Date object
      division: "", // ✅ Convert string to Date object
      type: "", // ✅ Convert string to Date object
    };
    setOrganisation(updatedOrganisation);
    onOrganisationChange(updatedOrganisation);
  };

  const addNewOrganisation = async () => {
    const filteredOrganisation = Object.fromEntries(
      Object.entries(organisation).filter(
        ([key, value]) => key !== "portfolio" && key !== "link" && value === ""
      )
    );

    setFilteredOrganisation(filteredOrganisation);
    console.log(filteredOrganisation);
    const hasMissingFields = Object.keys(filteredOrganisation).length > 0;
    // Use `hasMissingFields` instead of waiting for `isRequired`
    if (!hasMissingFields) {
      const res = await addOrganisation(organisation);
      setAdded(!added);
      const newAdd = !added;
      onAddedChange(newAdd);
      console.log(res?.data.organisations);
      setOrganisations(res?.data.organisations);
      const updatedOrganisation = {
        ...theData,
        address: "", // ✅ Convert string to Date object
        responsibility: "", // ✅ Convert string to Date object
        organisation_name: "", // ✅ Convert string to Date object
        division: "", // ✅ Convert string to Date object
        type: "", // ✅ Convert string to Date object
      };
      setOrganisation(updatedOrganisation);
      onOrganisationChange(updatedOrganisation);
      // setStep((prev) => prev + 1);
      setStatus(true);
    } else {
      if (Object.keys(filteredOrganisation).length >= 5) {
        setStatus(false);
        setRequired(true);
      } else {
        setRequired(true);
      }
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRequired(false);
    }, 3000); // 3 detik

    // Cleanup function untuk mencegah memory leak jika komponen unmount sebelum timeout selesai
    return () => clearTimeout(timeout);
  }, [required]);

  useEffect(() => {
    const getAllOrganisation = async () => {
      const res = await getOrganisations(1);
      setOrganisations(res?.data.organisations || []);
    };
    getAllOrganisation(); // <== invoke the function
  }, []);

  return (
    <div className="space-y-[1rem]">
      <UploadSuccess type={3} success={status} />
      <UploadRequired type={3} show={required} />
      <h1 className="font-bold text-[1.5rem]">Isi Organisasi Data</h1>
      {organisations.map((item: any, key: any) => (
        <div
          key={key}
          className="px-[2rem] py-[2rem] rounded-md border-[#cfcfcf] border-[1px]"
        >
          <p className="font-bold">{item.organisation_name}</p>
          <i>{item.division}</i>
          <p>{item.address}</p>
          <p>{item.responsibility}</p>
        </div>
      ))}
      <div className={`${added ? "" : "hidden"}`}>
        <div className="py-[2rem] text-[.9rem] space-y-[1rem]">
          <div className="space-y-[.5rem]">
            <Label name="Nama Organisasi" />
            <InputField
              name="organisation_name"
              onChange={handleChange}
              value={organisation.organisation_name}
            />
            <Required
              required="masukkan nama organisasi dulu"
              className={`${
                filteredOrganisation.organisation_name === undefined
                  ? "hidden"
                  : "block"
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Alamat" />
            <InputField
              name="address"
              onChange={handleChange}
              value={organisation.address}
            />
            <Required
              required="masukkan alamat kampusmu"
              className={`${
                filteredOrganisation.address === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Type Organisasi" />
            <InputField
              name="type"
              onChange={handleChange}
              value={organisation.type}
            />
            <Required
              required="masukkan type dulu"
              className={`${
                filteredOrganisation.type === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Divisi" />
            <InputField
              name="division"
              onChange={handleChange}
              value={organisation.division}
            />
            <Required
              required="masukkan devisimu dulu"
              className={`${
                filteredOrganisation.division === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Tanggung Jawab" />
            <InputField
              name="responsibility"
              onChange={handleChange}
              value={organisation.responsibility}
            />
            <Required
              required="masukkan tanggung jawab dulu"
              className={`${
                filteredOrganisation.responsibility === undefined
                  ? "hidden"
                  : ""
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Tanggal Mulai" />
            <InputDate name="start_date" onChange={handleChange} />
            <Required
              required="masukkan tanggal masuk dulu"
              className={`${
                filteredOrganisation.start_date === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Tanggal Selesai" />
            <InputDate name="end_date" onChange={handleChange} />
            <Required
              required="masukkan tanggal selesai dulu"
              className={`${
                filteredOrganisation.end_date === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <Button onClick={addNewOrganisation}>Tambah</Button>
        </div>
      </div>
      <button
        onClick={addingOrganisation}
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
