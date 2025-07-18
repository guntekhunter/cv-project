import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import { UpperCaseFormatter } from "@/app/function/UpperCaseFormatter";
import { editJob } from "@/app/fetch/edit/fetch";
import EditableJob from "../../input/EditableJob";
import EditableBulletList from "../../input/EditableBulletPoint";
import EditableDate from "../../input/EditableDate";

export default function CardLoopJobs({
  item,
  index,
  deleteOnList,
  editJobName,
}: any) {
  const handleFieldSave = async (updated: any) => {
    console.log(updated, "nimi");
    try {
      editJobName(updated);
      // await editJob(updated);
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  return (
    <div className="md:px-[2rem] px-[1rem] space-y-[1rem] bg-white">
      <div>
        <div className="font-bold md:text-[.9rem] space-y-1">
          <div className="font-light italic">
            <EditableJob
              value={item.job_name}
              fieldKey="job_name"
              itemId={item.id}
              cvId={item.cv_id}
              onSave={handleFieldSave}
            />{" "}
            <EditableJob
              value={item.job_type}
              fieldKey="job_type"
              itemId={item.id}
              cvId={item.cv_id}
              onSave={handleFieldSave}
            />
          </div>
          <EditableJob
            value={item.company_name}
            fieldKey="company_name"
            itemId={item.id}
            cvId={item.cv_id}
            onSave={handleFieldSave}
          />{" "}
          -{" "}
          <span className="font-light text-gray-500">
            <EditableJob
              value={item.company_address}
              fieldKey="company_address"
              itemId={item.id}
              cvId={item.cv_id}
              onSave={handleFieldSave}
            />
          </span>
        </div>

        <div>
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
      </div>

      <div className="space-y-2">
        <div className="italic">
          <EditableJob
            value={item.company_description}
            fieldKey="company_description"
            itemId={item.id}
            cvId={item.cv_id}
            isTextarea
            onSave={handleFieldSave}
          />
        </div>
        <EditableBulletList
          text={item.responsibility}
          fieldKey="responsibility"
          itemId={item.id}
          cvId={item.cv_id}
          onSave={handleFieldSave}
        />
      </div>
    </div>
  );
}
