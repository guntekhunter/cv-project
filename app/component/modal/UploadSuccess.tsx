"use client";
import React, { useEffect, useState } from "react";

export default function UploadSuccess(props: any) {
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (props.type === 1) {
      setStatus("Biodata");
    } else if (props.type === 3) {
      setStatus("Data Organisasi");
    } else if (props.type === 4) {
      setStatus("Riwayat Pekerjaan");
    } else if (props.type === 5) {
      setStatus("Riwayat pendidikan");
    } else if (props.type === 6) {
      setStatus("Sosial Media");
    } else {
      setStatus("Skill");
    }
  }, [props]);
  return (
    <div
      className={`fixed bg-green-100 top-[5rem] right-[1rem] px-[5rem] py-[1rem] rounded-[10px] border-green-600 text-green-600 border-[1.5px] transition-all duration-300 ease-in-out transform ${
        props.success
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <div>{status} Berhasil Di Tambahkan</div>
    </div>
  );
}
