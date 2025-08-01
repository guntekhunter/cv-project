import React from "react";

export default function LitleCard({ name, index, cv_id, deleteOnList }: any) {
  return (
    <div className="flex">
      <div
        className="flex items-center bg-secondary text-accent px-3 py-1 rounded-full text-sm max-w-full"
        key={index}
      >
        <span>{name}</span>
        <button
          className="ml-2 text-white hover:text-gray-200"
          onClick={() => deleteOnList(index, cv_id)}
        >
          <img src="/red-close.png" alt="" className="w-[1.5rem]" />
        </button>
      </div>
    </div>
  );
}
