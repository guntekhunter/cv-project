"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "../buttons/Button";
import { addNewCv } from "@/app/fetch/add/fetch";
import { useRouter } from "next/navigation";

export default function AddCv(props: any) {
  const [cvId, setCvId] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCv, setSelectedCv] = useState({
    user_id: null,
    PersonalData: [{}],
    Education: [{}],
    Organisation: [{}],
    Other: [{}],
    WorkExperience: [{}],
    SocialMedia: [{}],
  });

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

  const saveCV = async () => {
    try {
      localStorage.removeItem("is_new");
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
    localStorage.setItem("is_new", "false");
    localStorage.setItem("step", "0");
    route.push("/pilih-template");
  };

  return (
    <div className="fixed top-[-5rem] left-0 w-full h-[calc(100vh+5rem)] z-[100] bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-white py-[2rem] px-[2rem] rounded-md relative w-[70%] mt-[5rem]">
        <button
          onClick={props.onClose}
          className="absolute text-sm text-gray-600 hover:text-black top-1 right-1"
        >
          <Image
            src="/red-close.png"
            alt=""
            width={500}
            height={500}
            className="w-[2rem]"
          />
        </button>
        <h2>Pilih CV</h2>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-[1rem] mt-[1rem]">
          {props.cv.map((item: any) => {
            const isActive = cvId === item.id;
            return (
              <button
                key={item.id}
                className={`py-[1rem] px-[1rem] rounded-md transition-all border  text-[.6rem] md:text-[1rem]
          ${
            isActive
              ? "bg-blue-100 border-green-600 text-green-500"
              : "bg-white border-green-300 text-green-700 hover:bg-gray-100"
          }`}
                onClick={() => addCv(item.id)}
              >
                {item.cv_name ?? "Tanpa Nama"}
              </button>
            );
          })}
        </div>
        {/* <div className="mt-6 flex items-center space-x-2">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            {"<"}
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            {">"}
          </button>
        </div> */}
        <div className="flex space-x-[1rem]">
          <Button
            className="mt-[1.5rem] bg-secondary px-[1rem]"
            onClick={saveCV}
          >
            Gunakan Data Ini
          </Button>
          <Button
            className="mt-[1.5rem] bg-secondary px-[1rem]"
            onClick={goToTemplate}
          >
            Buat Baru
          </Button>
        </div>
      </div>
    </div>
  );
}
