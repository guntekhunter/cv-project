import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardLoop from "../cardLoops/CardLoop";
import { useEffect, useState } from "react";
import { getEducations, getJobs, getSocialMedias } from "@/app/fetch/get/fetch";
import CardLoopJobs from "../cardLoops/CardLoopJobs";
import CardLoopEducation from "../cardLoops/CardLoopJobsEducation";
// import { GripVertical } from "lucide-react"; // or any drag icon

export default function SortableItemSocialMedia({
  item,
  index,
  deleteOnList,
}: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [socialMedias, setSocialMedias] = useState([]);
  useEffect(() => {
    const getAllSocialMedia = async () => {
      const res = await getSocialMedias(174);
      const sorted = (res?.data.socialMedias || []).sort(
        (a: { order_index: number }, b: { order_index: number }) =>
          a.order_index - b.order_index
      );
      setSocialMedias(sorted);
    };
    getAllSocialMedia();
  }, []);

  console.log("inimi kapang", socialMedias);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="pt-[2rem] rounded-md border-[#cfcfcf] bg-white border-[1px] text-[.8rem] space-y-[1.5rem] overflow-hidden"
    >
      {/* 🟢 Drag handle only */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab px-4 pt-2 pb-1 flex items-center gap-2 text-gray-500"
      >
        {/* <GripVertical className="w-4 h-4" /> */}
        <span className="text-xs">Drag</span>
      </div>

      <CardLoopEducation
        item={item}
        index={index}
        deleteOnList={deleteOnList}
      />

      <button
        onClick={() => deleteOnList(item.id, item.personal_id)}
        className="w-full justify-center flex hover:bg-red-100 py-[1rem] border-t-[1.3px] ease-in-out duration-500 cursor-pointer"
      >
        <img src="/delete.png" alt="delete" className="w-[1.2rem]" />
      </button>
    </div>
  );
}
