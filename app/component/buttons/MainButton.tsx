"use client";
import React from "react";

type MainButtonProps = {
  onClick?: () => void;
  loading?: boolean;
  text?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function MainButton({
  onClick,
  loading = false,
  text = "Selanjutnya",
  type = "button",
  disabled = false,
}: MainButtonProps) {
  console.log(loading);
  return (
    <button
      className={`bg-[#6A44DA] rounded-[10px] p-[1rem] w-full text-white ${
        (loading || disabled) && "opacity-50 cursor-not-allowed"
      }`}
      onClick={onClick}
      type={type}
      disabled={loading || disabled}
    >
      {loading ? "Loading..." : text}
    </button>
  );
}
