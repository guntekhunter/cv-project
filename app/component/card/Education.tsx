"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";
import InputDate from "../input/Date";
import DropDown from "../input/DropDown";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { editEducationDragable } from "@/app/fetch/edit/fetch";
import { addEducation } from "@/app/fetch/add/fetch";
import { deleteEducation, deleteJob } from "@/app/fetch/delete/fetch";
import { getEducations, getJobs } from "@/app/fetch/get/fetch";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItemEducation from "./sortable/SortableItemEducation";
import Button from "../buttons/Button";

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
type FilteredEducationType = {
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
  onAddedChange: (val: boolean) => void;
  filtered: FilteredEducationType;
  theData: EducationType;
  adding: boolean;
  onEducationChange: (updatedBiodata: EducationType) => void;
};

export default function Education({
  onAddedChange,
  theData,
  onEducationChange,
}: EducationProps) {
  const [education, setEducation] = useState<EducationType>(theData);
  const [educations, setEducations] = useState<EducationType[]>([]);
  const [added, setAdded] = useState(false);
  const [filteredEducation, setFilteredEducation] = useState<any>({});
  const [status, setStatus] = useState(false);
  const [required, setRequired] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = educations.findIndex((item: any) => item.id === active.id);
    const newIndex = educations.findIndex((item: any) => item.id === over.id);

    const newOrder = [...educations];
    const [movedItem] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, movedItem);

    // ✅ Update each item's order_index based on new position
    const updatedOrder = newOrder.map((item: any, index: any) => ({
      ...item,
      order_index: index + 1, // or index, depending on your system
    }));

    setEducations(updatedOrder);
    try {
      console.log("Updated order:", updatedOrder);
      const res = await editEducationDragable(updatedOrder);
      if (res?.status === 200) {
        console.log("Organisations order updated successfully!");
      }
    } catch (error) {
      console.error(
        "Failed to update organisations order on the server",
        error
      );
    }
  };

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

  const addingEducation = () => {
    setAdded(!added);
    const newAdd = !added;
    onAddedChange(newAdd);
    const updatedEducation = {
      ...theData,
      school_name: "",
      major: "",
      ipk: "",
      education_type: "",
      school_address: "",
    };
    setEducation(updatedEducation);
    onEducationChange(updatedEducation);
  };

  const addNewEducation = async () => {
    let filteredEducation;
    if (
      education?.education_type !== "sma" &&
      education?.education_type !== "universitas"
    ) {
      filteredEducation = Object.fromEntries(
        Object.entries(education).filter(
          ([key, value]) => key !== "major" && key !== "ipk" && value === ""
        )
      );
    } else {
      filteredEducation = Object.fromEntries(
        Object.entries(education).filter(([_, value]) => value === "")
      );
    }

    setFilteredEducation(filteredEducation);

    const hasMissingFields = Object.keys(filteredEducation).length > 0;
    // Use `hasMissingFields` instead of waiting for `isRequired`
    if (!hasMissingFields) {
      const res = await addEducation(education);
      setAdded(!added);
      const newAdd = !added;
      onAddedChange(newAdd);

      setEducations(res?.data.educations);
      const updatedEducation = {
        ...theData,
        school_name: "",
        major: "",
        ipk: "",
        education_type: "",
        school_address: "",
      };
      setEducation(updatedEducation);
      onEducationChange(updatedEducation);
      // setStep((prev) => prev + 1);
      setStatus(true);
    } else {
      if (Object.keys(filteredEducation).length >= 5) {
        setStatus(false);
        setRequired(true);
      } else {
        setRequired(true);
      }
    }
  };

  const deleteOnList = async (id: any, cv: any) => {
    const data = {
      id,
      cv,
    };
    const res = await deleteEducation(data);
    setEducations(res?.data.updatedData || []);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRequired(false);
    }, 3000); // 3 detik

    // Cleanup function untuk mencegah memory leak jika komponen unmount sebelum timeout selesai
    return () => clearTimeout(timeout);
  }, [required]);

  useEffect(() => {
    const getAllEdication = async () => {
      const res = await getEducations(1);
      setEducations(res?.data.educations || []);
    };
    getAllEdication(); // <== invoke the function
  }, []);

  console.log("inimi", education);

  return (
    <div className="space-y-[1rem]">
      <h1 className="font-bold text-[1.5rem]">Riwayat Pekerjaan</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={educations.map((item: any) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {educations?.map((item: any, key: any) => (
            <SortableItemEducation
              key={item.id}
              item={item}
              index={key}
              deleteOnList={deleteOnList}
            />
          ))}
        </SortableContext>
      </DndContext>
      <div className={`${added ? "" : "hidden"}`}>
        <div className="py-[2rem] text-[.9rem] space-y-[1rem]">
          <div className="space-y-[.5rem]">
            <Label name="Pilih Jenjang" />
            <DropDown
              name="education_type"
              options={[
                { label: "Pilih", value: "" },
                { label: "SD", value: "sd" },
                { label: "SMP", value: "smp" },
                { label: "SMA", value: "sma" },
                { label: "UNIVERSITAS", value: "universitas" },
              ]}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Nama Sekolah/Universitas" />
            <InputField
              name="school_name"
              onChange={handleChange}
              value={education.school_name}
            />
          </div>
          {(education.education_type === "sma" ||
            education.education_type === "universitas") && (
            <div className="space-y-[.5rem]">
              <Label name="Jurusan" />
              <InputField
                name="major"
                onChange={handleChange}
                value={education.major}
              />
            </div>
          )}
          {education.education_type === "universitas" && (
            <div className="space-y-[.5rem]">
              <Label name="Ipk/Nilai" />
              <InputField
                name="ipk"
                onChange={handleChange}
                value={education.ipk}
              />
            </div>
          )}
          <div className="space-y-[.5rem]">
            <Label name="Alamat Sekolah/Universitas" />
            <InputField
              name="school_address"
              onChange={handleChange}
              value={education.school_address}
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
          <Button onClick={addNewEducation}>Tambah</Button>
        </div>
      </div>
      <button
        onClick={addingEducation}
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
