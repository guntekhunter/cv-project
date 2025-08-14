"use client";
import React from "react";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";

export default function LoginModal({ step, isOpen, setOpenModal }: any) {
  const route = useRouter();

  const login = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "login_after_create",
      button_name: "user login after create a cv",
      page_path: window.location.pathname,
    });
    route.push("/register");
    setOpenModal(false);
  };

  // console.log("inimi itunya");

  if (isOpen === false) {
    console.log("aiii");
    return;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white px-8 py-6 rounded-xl shadow-lg w-[90%] max-w-md transition-all duration-300 ease-in-out">
        {/* You can place your login form or content here */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        {/* Example content */}
        <div className="space-y-[1rem]">
          <p className="w-full text-center text-gray-500 text-[.8rem]">
            Untuk Download CV Harus Buat Akun
          </p>
          <Button onClick={login} className="bg-secondary ">
            Buat Akun
          </Button>
        </div>
      </div>
    </div>
  );
}
