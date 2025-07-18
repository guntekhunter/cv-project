import { DateFormater } from "@/app/function/DateFormater";
import React, { useState } from "react";

interface EditableDateProps {
  value?: string;
  fieldKey: string;
  itemId: number;
  cvId: number;
  onSave: (data: {
    id: number;
    cv_id: number;
    [key: string]: string | number;
  }) => Promise<void>;
}

const EditableDate: React.FC<EditableDateProps> = ({
  value = "",
  fieldKey,
  itemId,
  cvId,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dateValue, setDateValue] = useState(value);

  const handleSave = async () => {
    await onSave({ id: itemId, cv_id: cvId, [fieldKey]: dateValue });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDateValue(value || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission (if inside a form)
      handleSave();
    }
  };

  return isEditing ? (
    <div className="flex items-center gap-2">
      <input
        type="date"
        className="px-[1rem] py-[.5rem] border border-[#F6F6F6] rounded-[10px]"
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSave}
        className="text-sm text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
      >
        Save
      </button>
      <button
        onClick={handleCancel}
        className="text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
      >
        Cancel
      </button>
    </div>
  ) : (
    <span className="cursor-pointer" onClick={() => setIsEditing(true)}>
      {DateFormater(value) || "yyyy-mm-dd"}
    </span>
  );
};

export default EditableDate;
