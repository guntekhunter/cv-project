import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import { UpperCaseFormatter } from "@/app/function/UpperCaseFormatter";
import React from "react";

export default function CardLoopScialMedia({ item, index, deleteOnList }: any) {
  return (
    <div className="px-[2rem] space-y-[1rem] bg-white">
      <div>
        <div className="font-bold text-[.9rem]">
          <div className="font-light">
            <i>{item?.education_type}</i>
          </div>
          {`${UpperCaseFormatter(item.name)} - `}{" "}
          <span className="font-light text-gray-500">
            {UpperCaseFormatter(item.link_or_number)}
          </span>{" "}
        </div>
      </div>
    </div>
  );
}
