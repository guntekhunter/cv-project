"use client";

import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { getUser } from "@/app/fetch/get/fetch";
import getCookie from "@/app/function/GetCookies";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [tokeni, setTokeni] = useState<string | null>(null);

  const route = useRouter();
  const pathname = usePathname(); // this changes when route changes

  const fetchUser = async (id: number) => {
    try {
      const res = await getUser(id);
      console.log(res);
      setUserEmail(res?.data.user.email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const tokenCookes = getCookie("token");
    if (tokenCookes) {
      setTokeni(tokenCookes);
    }
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && tokenCookes) setToken(storedToken);

    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUserId(userObj?.id || null);
        fetchUser(parseInt(storedUser));
        setUserEmail(userObj?.email || null);
      } catch (e) {
        console.error("Invalid user data in localStorage:", e);
      }
    }
  }, [pathname]);

  console.log("Loaded userEmail from localStorage:", userEmail);
  // useEffect(() => {
  //   const email = localStorage.getItem("email");
  //   setUserEmail(email);
  // }, [pathname]); // re-run on route change

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.2;
      setIsSticky(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logOut = () => {
    localStorage.clear();
    Cookies.remove("token");

    setUserEmail(null);
    setToken(null);
    setTokeni(null);
    setUserId(null);
    setIsActive(false);

    route.push("/");
  };

  console.log(userEmail);

  if (pathname === "/login" || pathname === "/register") {
    return;
  }

  return (
    <>
      <div
        className={`w-full justify-center flex h-15 py-[1rem] ${
          isSticky
            ? "fixed top-0 z-50 backdrop-blur-lg bg-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300"
            : "absolute z-[100] bg-white transition-all duration-300 border-b-[1px] border-[#f4f4f4]"
        }`}
      >
        <div className="w-[80%] flex items-center justify-between">
          <div
            className="font-bold text-accent text-[1rem] w-[70%] cursor-pointer"
            onClick={() => route.push("/")}
          >
            BuatCv.Id
          </div>

          {!token && !tokeni ? (
            <div className="flex items-center space-x-[1rem] w-[30%]">
              <Button
                className="px-[1.5rem] py-[0.4rem] text-[.7rem] font-normal text-gray-600 rounded-[5px] bg-white border-[1.4px] border-gray-400"
                onClick={() => route.push("/register")}
              >
                Buat Akun
              </Button>
              <Button
                className="px-[1.5rem] py-[0.4rem] text-[.7rem] font-medium text-black rounded-[5px]"
                onClick={() => route.push("/login")}
              >
                Masuk
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-[1rem] relative">
              {isActive && (
                <div className="bg-white absolute right-0 top-[2.5rem] px-[2rem] py-[1rem] border border-gray-300 rounded-md">
                  <Button
                    className="px-[1.5rem] py-[0.4rem] text-[.7rem] font-medium text-black rounded-[5px]"
                    onClick={logOut}
                  >
                    Logout
                  </Button>
                </div>
              )}
              <div className="h-full flex items-center">
                <p className="text-[.7rem] text-gray-500">{userEmail}</p>
              </div>
              <div
                className="h-full flex items-center cursor-pointer hover:opacity-80"
                onClick={() => setIsActive(!isActive)}
              >
                <Image
                  src="/user.png"
                  alt=""
                  width={500}
                  height={500}
                  className="w-[2rem]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spacer div to offset navbar height */}
      <div className="h-16" />
    </>
  );
}
