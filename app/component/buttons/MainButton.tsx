"use client";
import React from "react";

type MainButtonProps = {
  onClick?: () => void;
  loading?: boolean;
  text?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children?: string;
};

export default function MainButton({
  onClick,
  loading = false,
  type = "button",
  disabled,
  className,
  children,
}: MainButtonProps) {
  return (
    <button
      className={`bg-[#6A44DA] rounded-[10px] p-[1rem] w-full text-white ${
        (loading || disabled) && "opacity-50 cursor-not-allowed"
      } ${className}`}
      onClick={onClick}
      type={type}
      disabled={loading || disabled}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
