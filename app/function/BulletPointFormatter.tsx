// components/BulletList.tsx

import React from "react";

interface BulletPointFormatter {
  text: string;
  className?: string;
}

const BulletList: React.FC<BulletPointFormatter> = ({
  text,
  className = "",
}) => {
  const items = text
    .split("•")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return (
    <ul
      className={`list-disc md:pl-5 pl-[.5rem] md:space-y-1 space-y-[.1rem] ${className}`}
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default BulletList;
