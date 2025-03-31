import React from "react";

export default function Required(props: any) {
  return (
    <div className={`w-full ${props.className}`}>
      <p className="text-red-400">{props.required}</p>
    </div>
  );
}
