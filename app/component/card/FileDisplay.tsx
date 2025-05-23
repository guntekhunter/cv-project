"use client";
import { getAllData } from "@/app/fetch/get/fetch";
import React, { useEffect, useState } from "react";

export default function FileDisplay(props: any) {
  const [data, setData] = useState([]);
  const step = props.step;

  console.log("show it", step);
  useEffect(() => {
    const getAllTheData = async () => {
      const cvIdString = localStorage.getItem("cv_id");
      const cvId = cvIdString !== null ? parseInt(cvIdString) : 0;
      const personalIdString = localStorage.getItem("personal_id");
      const personalId =
        personalIdString !== null ? parseInt(personalIdString) : 0;
      const res = await getAllData(cvId, personalId);
    };
    getAllTheData();
  }, [step]);
  return (
    <div className="bg-[#F6F6F6] w-full h-full overlay-scroll flex p-[2rem] justify-around text-[.5rem]">
      <div className="bg-white p-[2rem] w-[90%] shadow-md">
        {/* this will be the template */}
        {/* section 1 */}
        <div className="flex">
          <div className="w-[20%]">photo</div>
          <div className="w-[80%] bg-red-200">
            <h1 className="font-bold text-[.8rem]">Muh. Agung</h1>
            <div className="text-[.4rem]">
              <div className="flex space-x-1">
                <p>0090808</p>
                <p>|</p>
                <p>kasjkasdasjkd/asdhasdh</p>
              </div>
              <div className="pt-[2rem]">
                <p>Adress</p>
                <p>Proffesional summary</p>
              </div>
            </div>
          </div>
        </div>
        {/* skills */}
        <div className="pt-[1rem]">
          <h2 className="font-bold text-[.5rem]">
            Keterampilan Teknis, Keterampilan Non Teknis dan Pencapaian
          </h2>
          <ul className="list-disc pl-5">
            <li>
              <span>type year</span>
              <span>aasdasd</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
