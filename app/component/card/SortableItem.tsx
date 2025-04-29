import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardLoop from "./CardLoop";
// import { GripVertical } from "lucide-react"; // or any drag icon

export default function SortableItem({ item, index, deleteOnList }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="pt-[2rem] rounded-md border-[#cfcfcf] border-[1px] text-[.8rem] space-y-[1.5rem] overflow-hidden"
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

      <CardLoop item={item} index={index} deleteOnList={deleteOnList} />

      <button
        onClick={() => deleteOnList(item.id, item.cv_id)}
        className="w-full justify-center flex hover:bg-red-100 py-[1rem] border-t-[1.3px] ease-in-out duration-500 cursor-pointer"
      >
        <img src="/delete.png" alt="delete" className="w-[1.2rem]" />
      </button>
    </div>
  );
}
