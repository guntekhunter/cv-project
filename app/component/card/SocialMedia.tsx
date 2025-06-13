"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";
import DropDown from "../input/DropDown";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { editSocialMediaDragable } from "@/app/fetch/edit/fetch";
import { addSocialMedia } from "@/app/fetch/add/fetch";
import { deleteSocialMedia } from "@/app/fetch/delete/fetch";
import { getSocialMedias } from "@/app/fetch/get/fetch";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItemSocialMedia from "./sortable/SortableItemSocialMedia";
import Button from "../buttons/Button";

type SocialMediaType = {
  name: string;
  link_or_number: string;
  personal_data_id: number;
};

type SocialMediaProps = {
  onAddedChange: (val: boolean) => void;
  theData: SocialMediaType;
  adding: boolean;
  onSocialMediaChange: (updatedSocialMedia: SocialMediaType) => void;
};

export default function SocialMedia({
  onAddedChange,
  theData,
  onSocialMediaChange,
}: SocialMediaProps) {
  const [socialMedia, setSocialMedia] = useState<SocialMediaType>(theData);
  const [socialMedias, setSocialMedias] = useState<SocialMediaType[]>([]);
  const [filteredSocialMedia, setFilteredSocialMedia] = useState<any>({});
  const [added, setAdded] = useState(false);
  const [status, setStatus] = useState(false);
  const [required, setRequired] = useState(false);
  const [userId, setUserId] = useState<number>();
  const [personalId, setPersonalId] = useState<number>(0);

  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = socialMedias.findIndex(
      (item: any) => item.id === active.id
    );
    const newIndex = socialMedias.findIndex((item: any) => item.id === over.id);

    const newOrder = [...socialMedias];
    const [movedItem] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, movedItem);

    // ✅ Update each item's order_index based on new position
    const updatedOrder = newOrder.map((item: any, index: any) => ({
      ...item,
      order_index: index + 1, // or index, depending on your system
    }));

    setSocialMedias(updatedOrder);
    try {
      const res = await editSocialMediaDragable(updatedOrder);
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
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("personal_id");
      if (storedId) {
        setUserId(parseInt(storedId));
      }
    }
  }, []);

  useEffect(() => {
    if (theData) {
      setSocialMedia(theData);
    }
  }, [theData]);

  const handleChange = (field: string, value: string) => {
    if (!Object.keys(socialMedia).includes(field)) return; // Mencegah field yang tidak valid

    const updatedSocialMedia = { ...socialMedia, [field]: value };
    setSocialMedia(updatedSocialMedia);
    onSocialMediaChange(updatedSocialMedia);
  };

  // ini tambahannya
  const addingMediaSocial = () => {
    setAdded(!added);
    const newAdd = !added;
    onAddedChange(newAdd);
    const updatedSocialMedia = {
      ...theData,
      name: "",
      link_or_number: "",
    };
    setSocialMedia(updatedSocialMedia);
    onSocialMediaChange(updatedSocialMedia);
  };

  const addNewSocialMedia = async () => {
    const filteredSocialMedia = Object.fromEntries(
      Object.entries(socialMedia).filter(
        ([key, value]) => key !== "major" && key !== "ipk" && value === ""
      )
    );

    setFilteredSocialMedia(filteredSocialMedia);

    const hasMissingFields = Object.keys(filteredSocialMedia).length > 0;
    // Use `hasMissingFields` instead of waiting for `isRequired`
    if (!hasMissingFields) {
      const res = await addSocialMedia(socialMedia, userId);
      setAdded(!added);
      const newAdd = !added;
      onAddedChange(newAdd);

      setSocialMedias(res?.data.socialMedias);
      const updatedSocialMedias = {
        ...theData,
        name: "",
        link_or_number: "",
      };
      setSocialMedia(updatedSocialMedias);
      onSocialMediaChange(updatedSocialMedias);
      // setStep((prev) => prev + 1);
      setStatus(true);
    } else {
      if (Object.keys(filteredSocialMedia).length >= 3) {
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
      personalId: userId,
    };
    const res = await deleteSocialMedia(data);
    setSocialMedias(res?.data.updatedData || []);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRequired(false);
    }, 3000); // 3 detik

    // Cleanup function untuk mencegah memory leak jika komponen unmount sebelum timeout selesai
    return () => clearTimeout(timeout);
  }, [required]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const idString = localStorage.getItem("personal_id");
      const parsedId = idString !== null ? parseInt(idString) : 0;
      setPersonalId(parsedId);
    }
  }, []);

  useEffect(() => {
    const getAllEdication = async () => {
      const res = await getSocialMedias(personalId);
      setSocialMedias(res?.data.socialMedias || []);
    };
    getAllEdication(); // <== invoke the function
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // optional: prevent form submission if needed
      addNewSocialMedia();
    }
  };

  return (
    <div className="space-y-[1rem]">
      <h1 className="font-bold text-[1.5rem]">Isi Sosial Media</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={socialMedias.map((item: any) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {socialMedias?.map((item: any, key: any) => (
            <SortableItemSocialMedia
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
            <Label name="Nama Media Sosial" />
            <DropDown
              name="name"
              options={[
                { label: "Pilih", value: "pilih" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "Instagram", value: "instagram" },
                { label: "Facebook", value: "facebook" },
                { label: "Tiktok", value: "tiktok" },
                { label: "Youtube", value: "youtube" },
                { label: "X", value: "x" },
                { label: "Website", value: "website" },
              ]}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Link Atau Akun" />
            <InputField
              name="link_or_number"
              onChange={handleChange}
              value={socialMedia?.link_or_number}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button onClick={addNewSocialMedia}>Tambah</Button>
        </div>
      </div>
      <button
        onClick={addingMediaSocial}
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
