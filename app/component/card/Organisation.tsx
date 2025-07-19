"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import Label from "../input/Label";
import InputDate from "../input/Date";
import Required from "../error/Required";
import Button from "../buttons/Button";
import { addOrganisation } from "@/app/fetch/add/fetch";
import UploadSuccess from "../modal/UploadSuccess";
import UploadRequired from "../modal/UploadRequired";
import { getOrganisations } from "@/app/fetch/get/fetch";
import TextAreaBulletPoint from "../input/TextAreaBulletPoint";
import { deleteOrganisation } from "@/app/fetch/delete/fetch";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./sortable/SortableItem"; // Adjust the path based on your file structure
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { editOrganisationDragable } from "@/app/fetch/edit/fetch";
import SuccessAdd from "../modal/SuccessAdd";

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
  const [organisations, setOrganisations] = useState<OrganisationType[]>([]);
  const [added, setAdded] = useState(false);
  const [filteredOrganisation, setFilteredOrganisation] = useState<any>({});
  const [status, setStatus] = useState(false);
  const [required, setRequired] = useState(false);
  const [cvId, setCvId] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = organisations.findIndex(
      (item: any) => item.id === active.id
    );
    const newIndex = organisations.findIndex(
      (item: any) => item.id === over.id
    );

    const newOrder = [...organisations];
    const [movedItem] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, movedItem);

    // ✅ Update each item's order_index based on new position
    const updatedOrder = newOrder.map((item: any, index: any) => ({
      ...item,
      order_index: index + 1, // or index, depending on your system
    }));

    // Update frontend state
    setOrganisations(updatedOrder);

    // Call API to update backend
    try {
      const res = await editOrganisationDragable(updatedOrder);
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
      setOrganisation(theData);
    }
  }, [theData]);

  const handleChange = (field: string, value: string) => {
    if (!added) {
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
    setLoading(!loading);
    const filteredOrganisation = Object.fromEntries(
      Object.entries(organisation).filter(
        ([key, value]) => key !== "portfolio" && key !== "link" && value === ""
      )
    );

    setFilteredOrganisation(filteredOrganisation);

    const hasMissingFields = Object.keys(filteredOrganisation).length > 0;
    try {
      // Use `hasMissingFields` instead of waiting for `isRequired`
      if (!hasMissingFields) {
        const res = await addOrganisation({ ...organisation, cv_id: cvId });
        setAdded(!added);
        const newAdd = !added;
        onAddedChange(newAdd);
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
        setStatus(true);
        // setStep((prev) => prev + 1);
      } else {
        if (Object.keys(filteredOrganisation).length >= 5) {
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
    const res = await deleteOrganisation(data);
    setOrganisations(res?.data.organisations || []);
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
      const idString = localStorage.getItem("cv_id");
      const parsedId = idString !== null ? parseInt(idString) : 0;
      const res = await getOrganisations(parsedId);
      setOrganisations(res?.data.organisations || []);
    };
    getAllOrganisation(); // <== invoke the function
  }, []);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(false);
      }, 800); // 2 seconds

      return () => clearTimeout(timer); // Cleanup if component unmounts
    }
  }, [status]);

  console.log(status);

  return (
    <div className="space-y-[1rem]">
      <SuccessAdd success={status}>Riwayat Organisasi Ditambahkan</SuccessAdd>
      <UploadRequired type={3} show={required} />
      <h1 className="font-bold md:text-[1.5rem] w-full md:text-left text-center">
        Isi Riwayat Organisasi
      </h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={organisations.map((item: any) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {organisations?.map((item: any, key: any) => (
            <SortableItem
              key={item.id}
              item={item}
              index={key}
              deleteOnList={deleteOnList}
            />
          ))}
        </SortableContext>
      </DndContext>
      <div className={`${added ? "" : "hidden"}`}>
        <div className="py-[2rem] md:text-[.9rem] text-[.7rem] space-y-[1rem]">
          <div className="space-y-[.5rem]">
            <Label name="Nama Organisasi" />
            <InputField
              placeHolder="Pramuka"
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
            <Label name="Alamat Organisasi" />
            <InputField
              placeHolder="Jl. Sungai Kelara"
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
            <Label name="Jabatan" />
            <InputField
              placeHolder="Anggota/Ketua/Sekertaris/dll"
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
              placeHolder="Humas/dll"
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
            <TextAreaBulletPoint
              placeholder={`• Bertanggung jawab dalam menyampaikan informasi kegiatan ke peserta kegiatan`}
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
          <Button
            onClick={addNewOrganisation}
            loading={loading}
            className="bg-secondary"
          >
            Tambah
          </Button>
        </div>
      </div>
      <button
        onClick={addingOrganisation}
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
