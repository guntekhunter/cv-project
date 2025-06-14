"use client";

import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.2;
      setIsSticky(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full justify-center flex py-[1rem] ${
        isSticky
          ? "fixed top-0 z-50 backdrop-blur-lg bg-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300"
          : "absolute z-[100] bg-white transition-all duration-300 border-color-[#F6F6F6] border-b-[1px]"
      }`}
    >
      <div className="w-[80%]">
        <div className="w-[90%] font-bold text-[#272727]">BuatCv.Id</div>
      </div>
    </div>
  );
}
