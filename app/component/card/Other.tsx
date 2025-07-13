"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";
import DropDown from "../input/DropDown";
import Button from "../buttons/Button";
import { addOther } from "@/app/fetch/add/fetch";
import { getOthers } from "@/app/fetch/get/fetch";
import { deleteOther } from "@/app/fetch/delete/fetch";
import LitleCard from "./cardLoops/LitleCard";
import DatePickerYear from "../input/DatePickerYear";
import Required from "../error/Required";
import SuccessAdd from "../modal/SuccessAdd";

type OtherType = {
  type: string;
  name: string;
  year: string;
  cv_id: number;
};

type OtherProps = {
  theData: OtherType;
  onOtherChange: (updatedOtherMedia: OtherType) => void;
  onAddedChange: (val: boolean) => void;
};

export default function Other({
  theData,
  onOtherChange,
  onAddedChange,
}: OtherProps) {
  const [other, setOther] = useState<OtherType>(theData);
  const [others, setOthers] = useState<OtherType[]>([]);
  const [filteredOther, setFilteredOther] = useState<any>({});
  const [added, setAdded] = useState(false);
  const [status, setStatus] = useState(false);
  const [required, setRequired] = useState(false);
  const [cvId, setCvId] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cvIdString = localStorage.getItem("cv_id");
      const parsedCvId = cvIdString !== null ? parseInt(cvIdString) : 0;
      setCvId(parsedCvId);
    }
  }, []);

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

  const addNewOther = async () => {
    setLoading(!loading);
    const filteredOther = Object.fromEntries(
      Object.entries(other).filter(([key, value]) => value === "")
    );

    setFilteredOther(filteredOther);

    const hasMissingFields = Object.keys(filteredOther).length > 0;
    // Use `hasMissingFields` instead of waiting for `isRequired`
    try {
      if (!hasMissingFields) {
        const res = await addOther({ ...other, cv_id: cvId });
        setAdded(!added);
        const newAdd = !added;
        onAddedChange(newAdd);
        setOthers(res?.data.others);
        const updatedOther = {
          ...theData,
          name: "", // ✅ Convert string to Date object
        };
        setOther(updatedOther);
        onOtherChange(updatedOther);
        // setStep((prev) => prev + 1);
        setStatus(true);
      } else {
        if (Object.keys(filteredOther).length >= 5) {
          setStatus(false);
          setRequired(true);
        } else {
          setRequired(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAllOther = async () => {
      const idString = localStorage.getItem("cv_id");
      const parsedId = idString !== null ? parseInt(idString) : 0;
      const res = await getOthers(parsedId);
      setOthers(res?.data.others || []);
      console.log("skillsnya", res?.data);
    };
    getAllOther(); // <== invoke the function
  }, [cvId]);

  const deleteOnList = async (id: any, cv_id: any) => {
    const data = {
      id,
      cv_id,
    };
    const res = await deleteOther(data);
    setOthers(res?.data.updatedData || []);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // optional: prevent form submission if needed
      addNewOther();
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(false);
      }, 2000); // 2 seconds

      return () => clearTimeout(timer); // Cleanup if component unmounts
    }
  }, [status]);
  return (
    <div className="md:space-y-[1rem]">
      <SuccessAdd success={status}>
        Keahlian/sertifikat Berhasil Ditambah
      </SuccessAdd>
      <h1 className="font-bold md:text-[1.5rem] w-full text-center md:text-left">
        Isi Keahlian/Sertifikat
      </h1>
      <div className="flex flex-wrap gap-2">
        {others?.map((item: any, index: any) => (
          <LitleCard
            key={index}
            index={item.id}
            deleteOnList={deleteOnList}
            name={item.name}
            cv_id={item.cv_id}
          />
        ))}
      </div>
      <div className="py-[2rem] md:text-[.9rem] text-[.7rem] space-y-[1rem]">
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
          <Label name="Tahun" />
          <DatePickerYear name="year" onChange={handleChange} />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Nama Skill" />
          <InputField
            placeHolder="canva, word, excel ..."
            name="name"
            onChange={handleChange}
            value={other.name}
            onKeyDown={handleKeyDown}
          />
          <Required
            required="masukkan Nama Skill/Sertifikat"
            className={`${filteredOther.name === undefined ? "hidden" : ""}`}
          />
        </div>

        <Button onClick={addNewOther} loading={loading}>
          Tambah
        </Button>
      </div>
    </div>
  );
}
