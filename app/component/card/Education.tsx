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
import { editEdu, editEducationDragable } from "@/app/fetch/edit/fetch";
import { addEducation } from "@/app/fetch/add/fetch";
import { deleteEducation, deleteJob } from "@/app/fetch/delete/fetch";
import { getEducations, getJobs } from "@/app/fetch/get/fetch";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItemEducation from "./sortable/SortableItemEducation";
import Button from "../buttons/Button";
import SuccessAdd from "../modal/SuccessAdd";

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
  const [cvId, setCvId] = useState<number>(0);
  const [loading, setLoading] = useState(false);

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
    const cvIdString = localStorage.getItem("cv_id");
    if (cvIdString) {
      setCvId(parseInt(cvIdString));
    }
  }, []);

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
    setLoading(!loading);
    let filteredEducation;
    if (
      education?.education_type === "sd" ||
      education?.education_type === "smp"
    ) {
      filteredEducation = Object.fromEntries(
        Object.entries(education).filter(
          ([key, value]) => key !== "major" && key !== "ipk" && value === ""
        )
      );
    } else if (education?.education_type === "sma") {
      filteredEducation = Object.fromEntries(
        Object.entries(education).filter(
          ([key, value]) => key !== "ipk" && value === ""
        )
      );
      console.log(filteredEducation);
    } else {
      filteredEducation = Object.fromEntries(
        Object.entries(education).filter(([_, value]) => value === "")
      );
    }

    setFilteredEducation(filteredEducation);

    const hasMissingFields = Object.keys(filteredEducation).length > 0;
    try {
      // Use `hasMissingFields` instead of waiting for `isRequired`
      if (!hasMissingFields) {
        const res = await addEducation({ ...education, cv_id: cvId });
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  const handleFieldSave = async (updated: any) => {
    console.log(updated, "nimi");
    try {
      const res = await editEdu(updated);
      setEducations(res?.data.updatedData || []);
    } catch (err) {
      console.error("Failed to save:", err);
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
    const getAllEdication = async () => {
      const idString = localStorage.getItem("cv_id");
      const parsedId = idString !== null ? parseInt(idString) : 0;
      const res = await getEducations(parsedId);
      setEducations(res?.data.educations || []);
    };
    getAllEdication(); // <== invoke the function
  }, []);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(false);
      }, 800); // 2 seconds

      return () => clearTimeout(timer); // Cleanup if component unmounts
    }
  }, [status]);

  return (
    <div className="space-y-[1rem]">
      <SuccessAdd success={status}>Pendidikan Berhasil Ditambahkan</SuccessAdd>
      <h1 className="font-bold md:text-[1.5rem] w-full md:text-left text-center">
        Riwayat Pendidikan
      </h1>
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
              editEduName={handleFieldSave}
              deleteOnList={deleteOnList}
            />
          ))}
        </SortableContext>
      </DndContext>
      <div className={`${added ? "" : "hidden"}`}>
        <div className="py-[2rem] md:text-[.9rem] text-[.7rem] space-y-[1rem]">
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
              placeHolder="nama sekolah/universitas"
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
                placeHolder="Pendidikan Kewarga Negaraan ..."
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
                placeHolder="3.80/4.00"
                name="ipk"
                onChange={handleChange}
                value={education.ipk}
              />
            </div>
          )}
          <div className="space-y-[.5rem]">
            <Label name="Alamat Sekolah/Universitas" />
            <InputField
              placeHolder="Jl. Pendidikan No. 1..."
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
          <Button
            onClick={addNewEducation}
            loading={loading}
            className="bg-secondary"
          >
            Tambah
          </Button>
        </div>
      </div>
      <button
        onClick={addingEducation}
        className={`w-full md:h-[5rem] h-[4rem] rounded-md border-[1.5px] border-dashed border-[#828282] justify-around flex align-middle items-center ${
          added ? "hover:bg-[#ffe9e9]" : "hover:bg-[#efe9ff]"
        } ease-in-out duration-500 cursor-pointer`}
      >
        <div>
          {added ? (
            <img
              src="/red-close.png"
              alt=""
              className="md:w-[1.5rem] w-[.9rem]"
            />
          ) : (
            <img src="/plus.png" alt="" className="md:w-[1.5rem] w-[.9rem]" />
          )}
        </div>
      </button>
    </div>
  );
}
