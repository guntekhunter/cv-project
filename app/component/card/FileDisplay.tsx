"use client";
import { getAllData } from "@/app/fetch/get/fetch";
import React, { useEffect, useState } from "react";

export default function FileDisplay() {
  const [data, setData] = useState([]);

  console.log("inimi", localStorage.getItem("step"));
  useEffect(() => {
    const getAllTheData = async () => {
      const cvIdString = localStorage.getItem("cv_id");
      const cvId = cvIdString !== null ? parseInt(cvIdString) : 0;
      const personalIdString = localStorage.getItem("personal_id");
      const personalId =
        personalIdString !== null ? parseInt(personalIdString) : 0;
      const res = await getAllData(cvId, personalId);
      console.log(res);
    };
    getAllTheData();
  }, []);
  return (
    <div className="bg-[#F6F6F6] w-full h-full overlay-scroll flex p-[2rem] justify-around text-[.5rem]">
      <div className="bg-white p-[2rem] w-[90%] shadow-md">
        inimi kapang iha
      </div>
    </div>
  );
}
