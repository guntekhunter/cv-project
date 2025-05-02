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
import { editJobDragable } from "@/app/fetch/edit/fetch";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./sortable/SortableItem";
import { deleteJob } from "@/app/fetch/delete/fetch";
import { getJobs } from "@/app/fetch/get/fetch";
import { addJob } from "@/app/fetch/add/fetch";
import Button from "../buttons/Button";
import TextAreaBulletPoint from "../input/TextAreaBulletPoint";
import SortableItemJob from "./sortable/SortableItemJob";
import Required from "../error/Required";

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

type FilteredJobType = {
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
  onJobChange: (updatedJob: JobType) => void;
  filtered: FilteredJobType;
  adding: boolean;
  onAddedChange: (val: boolean) => void;
};

export default function Job({ onAddedChange, theData, onJobChange }: JobProps) {
  const [job, setJob] = useState<JobType>(theData);
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [added, setAdded] = useState(false);
  const [filteredJob, setFilteredJob] = useState<any>({});
  const [status, setStatus] = useState(false);
  const [required, setRequired] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = jobs.findIndex((item: any) => item.id === active.id);
    const newIndex = jobs.findIndex((item: any) => item.id === over.id);

    const newOrder = [...jobs];
    const [movedItem] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, movedItem);

    // ✅ Update each item's order_index based on new position
    const updatedOrder = newOrder.map((item: any, index: any) => ({
      ...item,
      order_index: index + 1, // or index, depending on your system
    }));

    setJobs(updatedOrder);
    try {
      console.log("Updated order:", updatedOrder);
      const res = await editJobDragable(updatedOrder);
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
      setJob(theData);
    }
  }, [theData]);

  const handleChange = (field: string, value: string) => {
    if (!added) {
      console.log("aih");
    } else {
      if (!Object.keys(job).includes(field)) return; // Mencegah field yang tidak valid
      const updatedJob = {
        ...job,
        [field]: field.includes("date") ? new Date(value) : value, // ✅ Convert string to Date object
      };

      setJob(updatedJob);
      onJobChange(updatedJob);
      // isAdded(true);
    }
  };

  const addingJob = () => {
    setAdded(!added);
    const newAdd = !added;
    onAddedChange(newAdd);
    const updatedJob = {
      ...theData,
      company_name: "",
      company_address: "",
      responsibility: "",
      company_description: "",
      job_type: "",
    };
    setJob(updatedJob);
    onJobChange(updatedJob);
  };

  const addNewJob = async () => {
    const filteredJob = Object.fromEntries(
      Object.entries(job).filter(
        ([key, value]) => key !== "portfolio" && key !== "link" && value === ""
      )
    );

    setFilteredJob(filteredJob);

    const hasMissingFields = Object.keys(filteredJob).length > 0;
    // Use `hasMissingFields` instead of waiting for `isRequired`
    if (!hasMissingFields) {
      const res = await addJob(job);
      setAdded(!added);
      const newAdd = !added;
      onAddedChange(newAdd);

      setJobs(res?.data.jobs);
      const updatedJob = {
        ...theData,
        company_name: "",
        company_address: "",
        responsibility: "",
        company_description: "",
        job_type: "",
      };
      setJob(updatedJob);
      onJobChange(updatedJob);
      // setStep((prev) => prev + 1);
      setStatus(true);
    } else {
      if (Object.keys(filteredJob).length >= 5) {
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
    const res = await deleteJob(data);
    setJobs(res?.data.updatedData || []);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRequired(false);
    }, 3000); // 3 detik

    // Cleanup function untuk mencegah memory leak jika komponen unmount sebelum timeout selesai
    return () => clearTimeout(timeout);
  }, [required]);

  useEffect(() => {
    const getAllJob = async () => {
      const res = await getJobs(1);
      setJobs(res?.data.jobs || []);
    };
    getAllJob(); // <== invoke the function
  }, []);

  console.log("inimi", job);

  return (
    <div className="space-y-[1rem]">
      <h1 className="font-bold text-[1.5rem]">Riwayat Pekerjaan</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={jobs.map((item: any) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {jobs?.map((item: any, key: any) => (
            <SortableItemJob
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
            <Label name="Nama Perusahaan" />
            <InputField
              name="company_name"
              value={job.company_name}
              onChange={handleChange}
            />
            <Required
              required="masukkan alamat kampusmu"
              className={`${
                filteredJob.company_name === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Alamat Perusahaan" />
            <InputField
              name="company_address"
              value={job.company_address}
              onChange={handleChange}
            />
            <Required
              required="masukkan alamat kampusmu"
              className={`${filteredJob.address === undefined ? "hidden" : ""}`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Pekerjaan" />
            <TextAreaBulletPoint
              name="responsibility"
              onChange={handleChange}
              value={job.responsibility}
            />
            <Required
              required="masukkan alamat kampusmu"
              className={`${
                filteredJob.responsibility === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Deskripsi Perusahaan" />
            <InputField
              name="company_description"
              value={job.company_description}
              onChange={handleChange}
            />
            <Required
              required="masukkan alamat kampusmu"
              className={`${
                filteredJob.company_description === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Tipe Pekerjaan" />
            <DropDown
              value={job.job_type}
              name="job_type"
              options={[
                { label: "Pilih Tipe", value: "Pilih Tipe" },
                { label: "Magang", value: "magang" },
                { label: "Full Time", value: "full-time" },
                { label: "Part Time", value: "part-time" },
              ]}
              onChange={handleChange}
            />
            <Required
              required="masukkan alamat kampusmu"
              className={`${
                filteredJob.job_type === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Tanggal Mulai" />
            <InputDate name="start_date" onChange={handleChange} />
            <Required
              required="masukkan alamat kampusmu"
              className={`${
                filteredJob.start_date === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Tanggal Selesai" />
            <InputDate name="end_date" onChange={handleChange} />
            <Required
              required="masukkan alamat kampusmu"
              className={`${
                filteredJob.end_date === undefined ? "hidden" : ""
              }`}
            />
          </div>
          <Button onClick={addNewJob}>Tambah</Button>
        </div>
      </div>
      <button
        onClick={addingJob}
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
