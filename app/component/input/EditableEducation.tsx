import { useState } from "react";

interface EditableEducation {
  value: string;
  fieldKey: string;
  itemId: number;
  cvId: number;
  isTextarea?: boolean;
  onSave: (data: {
    id: number;
    cv_id: number;
    [key: string]: string | number;
  }) => Promise<void>;
}

export default function EditableEducation({
  value,
  fieldKey,
  itemId,
  cvId,
  isTextarea = false,
  onSave,
}: EditableEducation) {
  const [editingValue, setEditingValue] = useState(value);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (editingValue !== value) {
      setLoading(true);
      await onSave({ id: itemId, cv_id: cvId, [fieldKey]: editingValue });
      setLoading(false);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isTextarea) {
      e.preventDefault();
      handleSave();
    }
  };

  if (editing) {
    const commonProps = {
      className: "border px-2 py-1 text-sm w-full",
      value: editingValue,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => setEditingValue(e.target.value),
      onKeyDown: handleKeyDown,
      onBlur: handleSave,
      disabled: loading,
      autoFocus: true,
    };

    return isTextarea ? (
      <textarea rows={3} {...commonProps} />
    ) : (
      <input {...commonProps} />
    );
  }

  return (
    <span
      className="hover:bg-yellow-50 cursor-pointer"
      onClick={() => setEditing(true)}
    >
      {value || <span className="text-gray-400 italic">Click to edit</span>}
    </span>
  );
}
