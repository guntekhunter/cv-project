"use client";

import Button from "../component/buttons/Button";

export default function Page() {
  return (
    <div className="w-full flex justify-center min-h-screen relative">
      <div className="w-full min-h-screen border border-[#F6F6F6] text-[#777777] grid grid-cols-[20%_80%] bg-white">
        <div className="border-r-[1.4px] border-[#f4f4f4]"></div>
        <div className="text-black p-4 grid grid-cols-5 grid-rows-2 text-[.5rem] gap-[1rem]">
          <div className="rounded-[10px] px-[1.3rem] py-[1rem] border-[#f4f4f4] border-[.1px] shadow-md flex flex-col">
            <div className="mt-auto">
              <Button>Download</Button>
            </div>
          </div>
          <div
            className={`w-full rounded-md border-[1.5px] border-dashed border-[#dfdfdf] justify-around flex align-middle items-center
          hover:bg-[#ffe9e9]`}
          >
            <img src="/plus.png" alt="" className="w-[1.5rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
