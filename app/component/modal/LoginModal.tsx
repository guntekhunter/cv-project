"use client";
import React from "react";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";

export default function LoginModal(props: any) {
  const route = useRouter();

  const login = () => {
    route.push("/login");
  };

  if (props.step !== 7) {
    return;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white px-8 py-6 rounded-xl shadow-lg w-[90%] max-w-md transition-all duration-300 ease-in-out">
        {/* You can place your login form or content here */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        {/* Example content */}
        <div className="space-y-[1rem]">
          <p className="w-full text-center text-gray-500 text-[.8rem]">
            Untuk Download CV Harus Buat Akun
          </p>
          <Button onClick={login}>Buat Akun</Button>
        </div>
      </div>
    </div>
  );
}
