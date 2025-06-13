"use client";
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
};

export default function Button({
  onClick,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`bg-[#6A44DA] rounded-[10px] p-[1rem] w-full text-white transition-opacity duration-200 ${
        loading || disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
