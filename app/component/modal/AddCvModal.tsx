"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "../buttons/Button";
import { addNewCv } from "@/app/fetch/add/fetch";
import { useRouter } from "next/navigation";

export default function AddCv(props: any) {
  const [cvId, setCvId] = useState<number | undefined>();
  const [selectedCv, setSelectedCv] = useState({
    user_id: null,
    PersonalData: [{}],
    Education: [{}],
    Organisation: [{}],
    Other: [{}],
    WorkExperience: [{}],
    SocialMedia: [{}],
  });
  console.log(props.cv, "ini cvnya");

  const route = useRouter();

  const addCv = (e: any) => {
    console.log(e, "idnya");
    const selected = props.cv.find((cvItem: any) => cvItem.id === e);
    if (!selected || !selected.PersonalData) return;

    // Set the state with the correct shape

    const social = selected.PersonalData?.SocialMedia ?? [];
    const cleanedSocialMedia = social.map(
      ({
        personal_data_id,
        ...rest
      }: {
        personal_data_id?: number;
        [key: string]: any;
      }) => rest
    );

    const { SocialMedia, cv_id, id, ...personal } = selected.PersonalData ?? {};
    // console.log(selected.PersonalData.SocialMedia, "social media");
    setSelectedCv({
      user_id: selected.user_id,
      PersonalData: personal,
      Education: selected.Education,
      Organisation: selected.Organisation,
      Other: selected.Other,
      WorkExperience: selected.WorkExperience,
      SocialMedia: cleanedSocialMedia,
    });

    setCvId(e); // optional: if you want to store selected id
  };
  console.log("✅ CV Selected:", selectedCv);

  const saveCV = async () => {
    try {
      const res = await addNewCv(selectedCv);
      const id = String(res?.data.cv_id);
      localStorage.setItem("cv_new_id", id);
      console.log(res, "ini respond datanya");
      // localStorage.setItem("personal_id", res?.data.personal_id);
      route.push("/pilih-template");
    } catch (error) {
      console.log(error);
    }
  };

  const goToTemplate = () => {
    route.push("/pilih-template");
  };

  return (
    <div className="fixed top-[-5rem] left-0 w-full h-[calc(100vh+5rem)] z-[100] bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-white py-[2rem] px-[2rem] rounded-md relative w-[70%] mt-[5rem]">
        <button
          onClick={props.onClose}
          className="absolute text-sm text-gray-600 hover:text-black top-1 left-1"
        >
          <Image
            src="/red-close.png"
            alt=""
            width={500}
            height={500}
            className="w-[1rem]"
          />
        </button>
        <Button className="mt-[1.5rem]" onClick={goToTemplate}>
          Buat Baru
        </Button>
        <h2>Pilih CV</h2>
        <div className="grid grid-cols-3 gap-[1rem] mt-[1rem]">
          {props.cv.map((item: any, index: any) => (
            <button
              key={index}
              className="bg-green-200 py-[1rem] px-[1rem] rounded-md"
              onClick={() => addCv(item.id)}
            >
              {item.id}
            </button>
          ))}
        </div>
        <Button className="mt-[1.5rem]" onClick={saveCV}>
          Gunakan Data Ini
        </Button>
      </div>
    </div>
  );
}
