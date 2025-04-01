"use client";
import React, { useEffect, useState } from "react";

export default function UploadSuccess(props: any) {
  return (
    <div
      className={`fixed bg-red-100 top-[5rem] right-[1rem] px-[5rem] py-[1rem] rounded-[10px] border-red-600 text-red-600 border-[1.5px] transition-all duration-300 ease-in-out transform ${
        props.show
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <div>Gagal Disimpan</div>
    </div>
  );
}
