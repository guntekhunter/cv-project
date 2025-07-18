import React, { useState } from "react";

interface EditableBulletListProps {
  text: string;
  className?: string;
  fieldKey: string;
  itemId: number;
  cvId: number;
  onSave: (data: {
    id: number;
    cv_id: number;
    [key: string]: string | number;
  }) => Promise<void>;
}

const EditableBulletList: React.FC<EditableBulletListProps> = ({
  text,
  className = "",
  fieldKey,
  itemId,
  cvId,
  onSave,
}) => {
  const initialItems = text
    .split("•")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const [items, setItems] = useState<string[]>(initialItems);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSaveItem = async (index: number, newValue: string) => {
    const updatedItems = [...items];
    updatedItems[index] = newValue;
    setItems(updatedItems);
    setEditingIndex(null);

    const updatedText = updatedItems.join(" • ");
    await onSave({ id: itemId, cv_id: cvId, [fieldKey]: updatedText });
  };

  const handleAddItem = () => {
    setItems((prev) => [...prev, ""]);
    setEditingIndex(items.length);
  };

  const handleDeleteItem = async (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    const updatedText = updatedItems.join(" • ");
    await onSave({ id: itemId, cv_id: cvId, [fieldKey]: updatedText });
  };

  return (
    <>
      <ul
        className={`list-disc md:pl-5 pl-[.5rem] md:space-y-1 space-y-[.1rem] ${className}`}
      >
        {items.map((item, index) => (
          <li key={index} className="cursor-pointer group">
            {editingIndex === index ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[index] = e.target.value;
                    setItems(updated);
                  }}
                  className="text-sm border px-2 py-1 rounded w-full"
                  autoFocus
                />
                <button
                  onClick={() => handleSaveItem(index, items[index])}
                  className="text-sm bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Tambah
                </button>
                <button
                  onClick={() => setEditingIndex(null)}
                  className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  Batal
                </button>
              </div>
            ) : (
              <div
                className="flex justify-between items-center"
                onClick={() => setEditingIndex(index)}
              >
                <span>{item}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteItem(index);
                  }}
                  className="invisible group-hover:visible text-xs text-red-500 ml-2"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddItem}
        className="text-sm text-green-600 hover:underline"
      >
        + Tambah Tanggung Jawab
      </button>
    </>
  );
};

export default EditableBulletList;
