"use client";
import React from "react";

export default function Button(props: any) {
  return (
    <button
      className="bg-[#6A44DA] rounded-[10px] p-[1rem] w-full text-white"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
