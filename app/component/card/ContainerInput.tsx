import FileDisplay from "../card/FileDisplay";
import CardInput from "../card/CardInput";
import { useState } from "react";

export default function ContainerInput() {
  const [step, setStep] = useState(1);
  const handleStep = (updatedStep: any) => {
    setStep(updatedStep);
  };

  console.log(step);
  return (
    <div className="w-full md:flex justify-center items-center min-h-screen relative md:pt-[6rem] pt-[5rem] pb-[10%]">
      <div className="bg-white w-[90%] rounded-[10px] md:p-[3rem] p-[.8rem] border-color-[#F6F6F6] border-[1px] text-[#777777] md:mx-0 mx-[1rem]">
        <div
          className={`grid w-full gap-[2rem] ${
            step !== 7 ? "md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          <div>
            <CardInput onChangeStep={handleStep} />
          </div>
          <div>
            <div className="md:flex hidden">
              <FileDisplay step={step} />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex">
        <FileDisplay step={step} />
      </div>
    </div>
  );
}
