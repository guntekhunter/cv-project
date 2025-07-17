"use client";
import React, { useEffect, useState } from "react";

export default function UploadSuccess(props: any) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    console.log(props.type, "typenya");
    if (props.type === 2) {
      setStatus("Biodata");
    } else if (props.type === 3) {
      setStatus("Sosial Media");
    } else if (props.type === 4) {
      setStatus("Skill");
    } else if (props.type === 5) {
      setStatus("Riwayat Pekerjaan");
    } else if (props.type === 6) {
      setStatus("Riwayat pendidikan");
    } else {
      setStatus("Data Organisasi");
    }
  }, [props]);
  return (
    <div
      className={`fixed text-[.5rem] md:text-[.8rem] z-50 bg-green-100 md:top-[5rem] bottom-2 md:bottom-auto right-[1rem] px-[5rem] py-[1rem] rounded-[10px] border-green-600 text-green-600 border-[1.5px] transition-all duration-300 ease-in-out transform md:w-[30%] ${
        props.success
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none"
      }
      `}
    >
      <div>{status} Berhasil Di Tambahkan</div>
    </div>
  );
}
