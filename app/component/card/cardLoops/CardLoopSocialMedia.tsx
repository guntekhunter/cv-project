import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import { UpperCaseFormatter } from "@/app/function/UpperCaseFormatter";
import React from "react";

export default function CardLoopScialMedia({ item, index, deleteOnList }: any) {
  return (
    <div className="md:px-[2rem] px-[1rem] space-y-[1rem] bg-white">
      <div>
        <div className="md:px-4 font-bold md:text-[.9rem] text-[.5rem] w-full">
          <div className="font-light">
            <i>{item?.education_type}</i>
          </div>

          <div className="flex flex-wrap gap-1 items-center w-full">
            <span className="whitespace-nowrap">{`${UpperCaseFormatter(item.name)} -`}</span>
            <span
              className="font-light text-gray-500 break-all w-full"
              title={UpperCaseFormatter(item.link_or_number)}
            >
              {UpperCaseFormatter(item.link_or_number)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
