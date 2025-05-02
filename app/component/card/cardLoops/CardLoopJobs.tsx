import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import { UpperCaseFormatter } from "@/app/function/UpperCaseFormatter";
import React from "react";

export default function CardLoopJobs({ item, index, deleteOnList }: any) {
  return (
    <div className="px-[2rem] space-y-[1rem] bg-white">
      <div>
        <div className="font-bold text-[.9rem]">
          <div className="font-light">
            <i>{item.job_type}</i>
          </div>
          {`${UpperCaseFormatter(item.company_name)} - `}{" "}
          <span className="font-light text-gray-500">
            {UpperCaseFormatter(item.company_address)}
          </span>{" "}
        </div>
        <p>{`${DateFormater(item.start_date)} - ${DateFormater(
          item.end_date
        )}`}</p>
      </div>
      <div className="space-y-2">
        <div className="italic">{`${item.company_description}`}</div>
        <p>{item.company_description}</p>
        <BulletList text={item.responsibility} />
      </div>
    </div>
  );
}
