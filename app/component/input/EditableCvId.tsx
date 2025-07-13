"use client";

import { useState } from "react";
import { editCvName } from "@/app/fetch/edit/fetch";

export default function EditableCvId({
  initialId,
  cvRowId,
  idCv,
  onSuccess,
}: {
  initialId: string;
  cvRowId: number;
  idCv: string;
  onSuccess?: (newName: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [cvName, setCvName] = useState(initialId || "Tanpa Nama");
  const [loading, setLoading] = useState(false);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLoading(true);
      try {
        const intId = parseInt(idCv);
        const data = {
          cv_id: intId,
          cv_name: cvName,
        };

        const res = await editCvName(data);

        console.log(res, "ini respondnya");

        setIsEditing(false); // ✅ close input on success
        onSuccess?.(cvName); // optional: update parent
      } catch (error) {
        console.error("Update failed:", error);
      } finally {
        setLoading(false); // ✅ fix: stop loading
      }
    }
  };

  return isEditing ? (
    <input
      className="border px-1 py-[2px] text-sm w-[80px]"
      value={cvName}
      onChange={(e) => setCvName(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => setIsEditing(false)}
      disabled={loading}
      autoFocus
    />
  ) : (
    <span
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:underline text-sm font-semibold text-gray-800"
    >
      {cvName.charAt(0).toUpperCase() + cvName.slice(1)}
    </span>
  );
}
