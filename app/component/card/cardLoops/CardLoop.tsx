import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import { UpperCaseFormatter } from "@/app/function/UpperCaseFormatter";
import React from "react";

export default function CardLoop({ item, index, deleteOnList }: any) {
  return (
    <div className="md:px-[2rem] px-[1rem] space-y-[1rem] bg-white">
      <div>
        <div className="font-bold md:text-[.9rem]">
          {`${UpperCaseFormatter(item.organisation_name)} - `}{" "}
          <span className="font-light text-gray-500">
            {UpperCaseFormatter(item.address)}
          </span>{" "}
        </div>
        <p>{`${DateFormater(item.start_date)} - ${DateFormater(
          item.end_date
        )}`}</p>
      </div>
      <div className="space-y-2">
        <div className="italic">{`${item.type} divisi ${item.division}`}</div>
        <p>{item.address}</p>
        <BulletList text={item.responsibility} />
      </div>
    </div>
  );
}
