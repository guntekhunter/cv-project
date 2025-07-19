"use client";
import { useState } from "react";
import Button from "../component/buttons/Button";
import UseCv from "../component/modal/UseCv";

export default function Page() {
  const [createNew, setCreateNew] = useState(false);
  const [useCv, setUseCv] = useState(false);

  return (
    <div className="">
      <div className="absolute top-0 left-0 z-[-1] h-full w-full backdrop-blur-xl">
        <UseCv />
        {/* Main content */}
        <div className="w-full flex justify-center items-center py-[2rem] relative ">
          <div className="w-[80%] grid-cols-2 grid gap-[2rem]">
            <button
              className="bg-red-400 rounded-md py-[2rem] px-[2rem] cursor-pointer"
              onClick={() => setCreateNew(true)}
            >
              ommaleka
            </button>
            <button
              className="bg-red-400 rounded-md py-[2rem] px-[2rem] cursor-pointer"
              onClick={() => setUseCv(true)}
            >
              ommaleka
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-[80%]">
            <Button className="w-full bg-secondary">Pilih</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
