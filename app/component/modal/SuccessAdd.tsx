"use client";
import React, { useEffect, useState } from "react";

export default function SuccessAdd(props: any) {
  return (
    <div
      className={`fixed text-[.5rem] md:text-[.8rem] z-50 bg-green-100 md:top-[5rem] bottom-2 md:bottom-auto right-[1rem] px-[5rem] py-[1rem] rounded-[10px] border-green-600 text-green-600 border-[1.5px] transition-all duration-300 ease-in-out transform md:w-[30%] ${
        props.success
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none"
      }
      `}
    >
      <div>{props.children}</div>
    </div>
  );
}
