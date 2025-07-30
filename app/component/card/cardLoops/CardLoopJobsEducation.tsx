import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import { UpperCaseFormatter } from "@/app/function/UpperCaseFormatter";
import React from "react";
import EditableJob from "../../input/EditableJob";
import EditableDate from "../../input/EditableDate";

export default function CardLoopEducation({
  item,
  index,
  deleteOnList,
  editEduName,
}: any) {
  const handleFieldSave = async (updated: any) => {
    console.log(updated, "nimi");
    try {
      editEduName(updated);
      // await editJob(updated);
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };
  return (
    <div className="md:px-[2rem] px-[1rem] md:space-y-[1rem] space-y-[.5rem] bg-white">
      <div>
        <div className="font-bold md:text-[.9rem]">
          <div className="font-light">
            <EditableJob
              value={item?.education_type}
              fieldKey="education_type"
              itemId={item?.id}
              cvId={item?.cv_id}
              onSave={handleFieldSave}
            />
          </div>
          <EditableJob
            value={item?.school_name}
            fieldKey="school_name"
            itemId={item?.id}
            cvId={item?.cv_id}
            onSave={handleFieldSave}
          />{" "}
          -{" "}
          <EditableJob
            value={item?.major}
            fieldKey="major"
            itemId={item?.id}
            cvId={item?.cv_id}
            onSave={handleFieldSave}
          />{" "}
        </div>
        <EditableDate
          value={item.start_date}
          fieldKey="start_date"
          itemId={item.id}
          cvId={item.cv_id}
          onSave={handleFieldSave}
        />{" "}
        -{" "}
        <EditableDate
          value={item.end_date}
          fieldKey="end_date"
          itemId={item.id}
          cvId={item.cv_id}
          onSave={handleFieldSave}
        />
      </div>
      <div className="space-y-2">
        {item.ipk && (
          <EditableJob
            value={item?.ipk}
            fieldKey="ipk"
            itemId={item?.id}
            cvId={item?.cv_id}
            onSave={handleFieldSave}
          />
        )}
      </div>
    </div>
  );
}
