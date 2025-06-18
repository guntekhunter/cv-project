import { editPersonalData } from "@/app/fetch/edit/fetch";
import React from "react";

interface InputPhotoProps {
  name: string;
  onChange: (field: string, value: string) => void;
  id: number;
}

export default function InputPhoto({ name, onChange, id }: InputPhotoProps) {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pevesindo");
      formData.append("folder", "cv-app");
      formData.append("cloud_name", "unm");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/unm/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        console.log("Upload success:", result);
        const data = {
          id,
          photo: result.secure_url,
        };
        const res = await editPersonalData(data);
        onChange(name, result.secure_url); // if your backend returns a file URL
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };
  return (
    <div className="w-[30%] h-[10rem] rounded-[1rem] border-[1px] flex items-center justify-center relative">
      <input
        type="file"
        accept="image/*"
        className="absolute opacity-0 w-full h-full cursor-pointer"
        onChange={handleFileChange}
      />
    </div>
  );
}
