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
import { editJob, editJobDragable } from "@/app/fetch/edit/fetch";
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
import SuccessAdd from "../modal/SuccessAdd";

type JobType = {
  company_name: string;
  company_address: string;
  responsibility: string;
  company_description: string;
  job_type: string;
  job_name: string;
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
  job_name: string;
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
  const [cvId, setCvId] = useState<number>(0);
  const [loading, setLoading] = useState(false);

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
    console.log(theData);
    if (theData) {
      setJob(theData);
    }
  }, [theData]);

  useEffect(() => {
    const cvIdString = localStorage.getItem("cv_id");
    if (cvIdString) {
      setCvId(parseInt(cvIdString));
    }
  }, []);

  const handleChange = (field: string, value: string) => {
    if (!added) {
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
      job_name: "",
    };
    setJob(updatedJob);
    onJobChange(updatedJob);
  };

  const addNewJob = async () => {
    setLoading(!loading);
    const filteredJob = Object.fromEntries(
      Object.entries(job).filter(
        ([key, value]) => key !== "portfolio" && key !== "link" && value === ""
      )
    );

    setFilteredJob(filteredJob);

    const hasMissingFields = Object.keys(filteredJob).length > 0;
    try {
      // Use `hasMissingFields` instead of waiting for `isRequired`
      if (!hasMissingFields) {
        const res = await addJob({ ...job, cv_id: cvId });
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
          job_name: "",
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
    const res = await deleteJob(data);
    setJobs(res?.data.updatedData || []);
  };

  const handleFieldSave = async (updated: any) => {
    console.log(updated, "nimi");
    try {
      const res = await editJob(updated);
      setJobs(res?.data.updatedData || []);
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
    const getAllJob = async () => {
      const idString = localStorage.getItem("cv_id");
      const parsedId = idString !== null ? parseInt(idString) : 0;
      const res = await getJobs(parsedId);
      setJobs(res?.data.jobs || []);
    };
    getAllJob(); // <== invoke the function
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
      <SuccessAdd success={status}>Pekerjaan Berhasil Ditambahkan</SuccessAdd>
      <h1 className="font-bold md:text-[1.5rem] w-full md:text-left text-center">
        Riwayat Pekerjaan
      </h1>
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
              editJobName={handleFieldSave}
              deleteOnList={deleteOnList}
            />
          ))}
        </SortableContext>
      </DndContext>
      <div className={`${added ? "" : "hidden"}`}>
        <div className="py-[2rem] md:text-[.9rem] text-[.7rem] space-y-[1rem]">
          <div className="space-y-[.5rem]">
            <Label name="Nama Perusahaan" />
            <InputField
              placeHolder="Pt.Astra Daihatsu merdeka ..."
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
            <Label name="Deskripsi Perusahaan" />
            <InputField
              placeHolder="Pt.Astra merupakan perusahaan yang begerak dibidang ..."
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
            <Label name="Alamat Perusahaan" />
            <InputField
              placeHolder="Jl. Kemerdekaan No 2 ..."
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
            <Label name="Posisi Pekerjaan" />
            <InputField
              placeHolder="Admin Kasir"
              name="job_name"
              value={job.job_name}
              onChange={handleChange}
            />
            <Required
              required="masukkan alamat kampusmu"
              className={`${filteredJob.address === undefined ? "hidden" : ""}`}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Tanggung Jawab" />
            <TextAreaBulletPoint
              placeholder={`• Tulis poin seperti: Memimpin tim proyek \n• Bertanggung jawab Mengelola akun Media Sosial dari 5k follower ke 100k dalam 1 bulan`}
              name="responsibility"
              onChange={handleChange}
              value={job.responsibility}
            />
            <Required
              required="masukkan Kantormu"
              className={`${
                filteredJob.responsibility === undefined ? "hidden" : ""
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
          <Button
            onClick={addNewJob}
            loading={loading}
            className="bg-secondary "
          >
            Tambah
          </Button>
        </div>
      </div>
      <button
        onClick={addingJob}
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
