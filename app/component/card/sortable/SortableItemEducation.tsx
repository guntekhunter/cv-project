import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardLoop from "../cardLoops/CardLoop";
import { useEffect, useState } from "react";
import { getEducations, getJobs } from "@/app/fetch/get/fetch";
import CardLoopJobs from "../cardLoops/CardLoopJobs";
import CardLoopEducation from "../cardLoops/CardLoopJobsEducation";
// import { GripVertical } from "lucide-react"; // or any drag icon

export default function SortableItem({
  item,
  index,
  deleteOnList,
  editEduName,
}: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [educations, setEducations] = useState([]);
  useEffect(() => {
    const cvIdString = localStorage.getItem("cv_id");
    const parsedCvId = cvIdString !== null ? parseInt(cvIdString) : 0;
    const getAllEducation = async () => {
      const res = await getEducations(parsedCvId);
      const sorted = (res?.data.educations || []).sort(
        (a: { order_index: number }, b: { order_index: number }) =>
          a.order_index - b.order_index
      );
      setEducations(sorted);
    };
    getAllEducation();
  }, []);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="pt-[2rem] rounded-md border-[#cfcfcf] bg-white border-[1px] md:text-[.8rem] text-[.4rem] md:space-y-[1.5rem] space-y-[.5rem] overflow-hidden"
    >
      {/* 🟢 Drag handle only */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab px-4 md:pt-2 md:pb-1 flex items-center gap-2 text-gray-500"
      >
        {/* <GripVertical className="w-4 h-4" /> */}
        <span className="md:text-xs text-[.5rem]">Drag</span>
      </div>

      <CardLoopEducation
        item={item}
        index={index}
        deleteOnList={deleteOnList}
        editEduName={editEduName}
      />

      <button
        onClick={() => deleteOnList(item.id, item.cv_id)}
        className="w-full justify-center flex hover:bg-red-100 md:py-[1rem] py-[.5rem] border-t-[1.3px] ease-in-out duration-500 cursor-pointer"
      >
        <img
          src="/delete.png"
          alt="delete"
          className="md:w-[1.2rem] w-[.5rem]"
        />
      </button>
    </div>
  );
}
