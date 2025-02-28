"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";
import DropDown from "../input/DropDown";

type SocialMediaType = {
  name: string;
  link_or_number: string;
  personal_data_id: number;
};

type SocialMediaProps = {
  theData: SocialMediaType;
  onSocialMediaChange: (updatedSocialMedia: SocialMediaType) => void;
};

export default function SocialMedia({
  theData,
  onSocialMediaChange,
}: SocialMediaProps) {
  const [socialMedia, setSocialMedia] = useState<SocialMediaType>(theData);

  useEffect(() => {
    if (theData) {
      setSocialMedia(theData);
    }
  }, [theData]);

  const handleChange = (field: string, value: string) => {
    if (!Object.keys(SocialMedia).includes(field)) return; // Mencegah field yang tidak valid

    const updatedSocialMedia = { ...socialMedia, [field]: value };
    setSocialMedia(updatedSocialMedia);
    onSocialMediaChange(updatedSocialMedia);
  };

  return (
    <div className="space-y-[1rem]">
      <h1 className="font-bold text-[1.5rem]">Isi Sosial Media</h1>
      <div className="py-[2rem] text-[.9rem] space-y-[1rem]">
        <div className="space-y-[.5rem]">
          <Label name="Nama Media Sosial" />
          <DropDown
            name="name"
            options={[
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
          <InputField name="link_or_number" onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
