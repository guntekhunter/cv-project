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
      className={`rounded-[10px] py-[.5rem] text-accent transition-all duration-300 ease-in-out hover:bg-accent cursor-pointer hover:text-white border-[1.2px] md:text-[.7rem] text-[.7rem] ${
        loading || disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
