import React, { useEffect, useRef } from "react";

interface TextAreaProps {
  name: string;
  value?: string;
  onChange: (field: string, value: string) => void;
}

export default function TextAreaBulletPoint({
  name,
  value = "",
  onChange,
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ensure each line starts with a bullet, especially the first
  useEffect(() => {
    if (!value.startsWith("•")) {
      onChange(name, `• ${value.trim()}`);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { selectionStart, selectionEnd } = e.currentTarget;

    // Prevent deleting the first bullet
    if (
      e.key === "Backspace" &&
      selectionStart === 2 && // Cursor right after "• "
      selectionStart === selectionEnd && // no selection
      value.startsWith("• ")
    ) {
      e.preventDefault();
      return;
    }

    // On Enter, insert a new bullet point
    if (e.key === "Enter") {
      e.preventDefault();
      const textBefore = value.substring(0, selectionStart);
      const textAfter = value.substring(selectionEnd);
      const newValue = `${textBefore}\n• ${textAfter}`;
      onChange(name, newValue);

      setTimeout(() => {
        const newPos = selectionStart + 3; // "\n• " = 3 chars
        textareaRef.current?.setSelectionRange(newPos, newPos);
      }, 0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = e.target.value;

    // If everything is deleted, reset to "• "
    if (newValue.trim() === "") {
      newValue = "• ";
    }

    // Ensure every line starts with a bullet
    const lines = newValue.split("\n").map((line) => {
      const trimmed = line.trim();
      if (trimmed === "" || trimmed === "•") return ""; // allow deletion of empty bullet lines
      return trimmed.startsWith("•") ? line : `• ${trimmed}`;
    });

    onChange(name, lines.join("\n"));
  };

  return (
    <textarea
      ref={textareaRef}
      className="w-full border-color-[#F6F6F6] border-[1px] rounded-[10px] h-[10rem] p-[1rem]"
      value={value}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );
}
