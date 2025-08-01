"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import TextArea from "../input/TextArea";
import Required from "../error/Required";
import { deleteImage } from "@/app/fetch/delete/fetch";
import { editPersonalData } from "@/app/fetch/edit/fetch";

type BiodataType = {
  id?: number;
  address: string;
  professional_summary: string;
  photo: string;
  name: string;
  cv_id: number;
  myemail: string;
  no_hp: number;
};

type FilteredBiodataType = {
  link: string;
  portfolio: string;
  address: string;
  professional_summary: string;
  photo: string;
  name: string;
  myemail: string;
  no_hp: number;
  cv_id: number;
};

type BiodataProps = {
  theData: BiodataType;
  onBiodataChange: (updatedBiodata: BiodataType) => void;
  filtered: FilteredBiodataType;
};

export default function Biodata({
  theData,
  onBiodataChange,
  filtered,
}: BiodataProps) {
  const [biodata, setBiodata] = useState<BiodataType>(theData);
  const [image, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [internetDisconnected, setInternetDisconnected] = useState(false);

  const cancelImage = async () => {
    const url = biodata.photo; // Full image URL from Cloudinary
    const afterUpload = url.split("/upload/")[1]; // 'v1750083103/cv-app/my-image.jpg'

    const parts = afterUpload.split("/");

    // If the first part starts with "v" (e.g., "v1750083103"), skip it
    const versionIsPresent = parts[0].startsWith("v");
    const cleanParts = versionIsPresent ? parts.slice(1) : parts;

    const filenameWithExt = cleanParts.pop() || ""; // e.g. 'my-image.jpg'
    const filename = filenameWithExt.split(".")[0]; // 'my-image'
    const folder = cleanParts.join("/"); // 'cv-app'

    const publicId = folder ? `${folder}/${filename}` : filename;

    console.log("📂 folder:", folder);
    console.log("🆔 public_id:", publicId);

    const newData = {
      id: biodata.id,
      public_id: publicId,
    };
    {
      biodata.name &&
        biodata.address &&
        biodata.professional_summary &&
        (await deleteImage(newData));
    }
    await editPersonalData(newData);
    setImage("");
  };

  useEffect(() => {
    if (theData) {
      setBiodata(theData);
      setImage(theData.photo);
    }
  }, [theData]);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleChange = async (field: string, value: string) => {
    if (!Object.keys(biodata).includes(field)) return; // Mencegah field yang tidak valid
    // Check if the field is empty and set error
    const updatedBiodata = { ...biodata, [field]: value };
    setBiodata(updatedBiodata);
    onBiodataChange(updatedBiodata);
  };
  return (
    <div className="space-y-[1rem]">
      <h1 className="font-bold md:text-[1.5rem] text-[1rem]">Isi Biodata</h1>
      <div className="md:py-[2rem] md:text-[.9rem] text-[.6rem] space-y-[1rem]">
        <div className="space-y-[.5rem]">
          <Label name="Foto" />
          {image ? (
            <div>
              <button
                className="w-[1rem] transition-transform duration-300 hover:scale-110"
                onClick={cancelImage}
              >
                <img src="/close.png" alt="" className="w-1rem" />
              </button>
              <img
                src={image}
                alt="Uploaded preview"
                className="md:w-64 md:h-64 w-full h-50 object-cover rounded-lg"
              />
            </div>
          ) : (
            <>
              {!loadingImage ? (
                <InputPhoto
                  name="photo"
                  onChange={handleChange}
                  id={biodata.id ?? 0}
                  setLoadingImage={setLoadingImage}
                  setInternetDisconnected={setInternetDisconnected}
                />
              ) : (
                <div className="md:w-[30%] md:h-[10rem] w-full h-[10rem] rounded-[1rem] border-[1px] flex items-center justify-center relative">
                  <div className="w-8 h-8 border-4 border-t-transparent border-secondary rounded-full animate-spin"></div>
                </div>
              )}
            </>
          )}
          <Required
            required="Periksa koneksi internet!!"
            className={`${!internetDisconnected ? "hidden" : ""}`}
          />
          <Required
            required="masukkan foto dulu"
            className={`${filtered.photo === undefined ? "hidden" : ""}`}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Nama" />
          <InputField
            placeHolder="Burhan ..."
            name="name"
            value={biodata.name ?? ""}
            onChange={handleChange}
          />
          <Required
            required="masukkan nama dulu"
            className={`${filtered.name === undefined ? "hidden" : ""}`}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Email" />
          <InputField
            placeHolder="burhan@gmail.com"
            name="myemail"
            value={biodata.myemail ?? ""}
            onChange={handleChange}
          />
          <Required
            required="masukkan email dulu"
            className={`${filtered.myemail === undefined ? "hidden" : ""}`}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="No Hp" />
          <InputField
            placeHolder="085241944648"
            name="no_hp"
            value={biodata.no_hp?.toString() ?? ""}
            onChange={handleChange}
          />

          <Required
            required="masukkan no_hp"
            className={`${filtered.myemail === undefined ? "hidden" : ""}`}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Alamat" />
          <InputField
            placeHolder="Jl. jalan kepasar malam ..."
            name="address"
            value={biodata.address ?? ""}
            onChange={handleChange}
          />
          <Required
            required="Professional summary"
            className={`${filtered.address === undefined ? "hidden" : ""}`}
          />
        </div>
        <div className="space-y-[.5rem]">
          <Label name="Deskripsi Diri *" />
          <TextArea
            name="professional_summary"
            value={biodata.professional_summary ?? ""}
            onChange={handleChange}
          />
          <Required
            required="Professional summary"
            className={`${
              filtered.professional_summary === undefined ? "hidden" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}
