"use client";
import Image from "next/image";
import Navbar from "./component/global/Navbar";
import Biodata from "./component/card/Biodata";
import FileDisplay from "./component/card/FileDisplay";
import CardInput from "./component/card/CardInput";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState();
  const handleStep = (updatedStep: any) => {
    setStep(updatedStep);
  };
  console.log(step);
  return (
    <div className="w-full flex justify-center items-center min-h-screen relative pt-[7%] pb-[10%]">
      <div className="bg-white w-[90%] rounded-[10px] p-[3rem] border-color-[#F6F6F6] border-[1px] text-[#777777]">
        <div
          className={`grid  w-full gap-[2rem] ${
            step !== 7 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          <div>
            <CardInput onChangeStep={handleStep} />
          </div>
          <div>
            <FileDisplay step={step} />
          </div>
        </div>
      </div>
    </div>
  );
}
