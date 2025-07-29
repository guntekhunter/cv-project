"use client";

import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { getUser } from "@/app/fetch/get/fetch";
import getCookie from "@/app/function/GetCookies";
import { supabase as supabaseClient } from "@/lib/supabase-client";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [tokeni, setTokeni] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);

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

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    console.log(error);
  };

  const logOut = () => {
    setIsOpen(false);
    localStorage.clear();
    Cookies.remove("token");

    setUserEmail(null);
    setToken(null);
    setTokeni(null);
    setUserId(null);
    setIsActive(false);
    signOut();

    route.push("/");
  };

  console.log(userEmail);

  const shouldHideNavbar = pathname === "/login" || pathname === "/register";

  const login = (buttonId: string) => {
    setLoading(true);
    setActiveButton(buttonId);
    route.push("/login");
  };

  const register = (buttonId: string) => {
    setLoading(true);
    setActiveButton(buttonId);
    route.push("/register");
  };

  // Then this effect:
  useEffect(() => {
    if (loading) {
      setLoading(false);
      setActiveButton(null);
    }
  }, [pathname]);

  return shouldHideNavbar ? null : (
    <>
      <div
        className={`w-full justify-center flex ${
          isSticky
            ? "fixed top-0 z-50 px-[1rem] py-[1rem]"
            : "absolute z-[100] px-[2rem] py-[1.9rem]"
        }`}
      >
        <div
          className={`w-full flex items-center justify-between relative ${isSticky ? "backdrop-blur-lg bg-white/50 transition-all duration-300 py-[1rem] px-[2rem] rounded-full border-[.5px]" : ""}`}
        >
          {/* Logo */}
          <div
            className="font-bold text-accent text-[1rem] cursor-pointer flex items-center space-x-[.5rem]"
            onClick={() => route.push("/")}
          >
            <Image
              src="/logo.png"
              alt=""
              width={500}
              height={500}
              className="w-[1.2rem]"
            />
            <p>BuatCv.Id</p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-[1rem]">
            {!token && !tokeni ? (
              <>
                <Button
                  className="bg-secondary md:w-[10rem] text-[.7rem] font-normal text-gray-600 rounded-[5px] bg-white border-[1.4px] border-gray-400 py-[1rem]"
                  onClick={() => register("register")}
                  loading={loading && activeButton === "register"}
                >
                  Buat Akun
                </Button>
                <Button
                  className="bg-secondary md:w-[10rem] py-[1rem] text-[.7rem] font-normal text-gray-600 rounded-[5px]"
                  onClick={() => login("login")}
                  loading={loading && activeButton === "login"}
                >
                  Masuk
                </Button>
              </>
            ) : (
              <div className="relative flex items-center space-x-[1rem]">
                {isActive && (
                  <div className="absolute right-0 top-[2.5rem] px-[2rem] py-[1rem] bg-white border border-gray-300 rounded-md">
                    <Button
                      className="bg-secondary md:w-[10rem] h-full px-[1.5rem] py-[0.4rem] text-[.7rem] font-medium text-black rounded-[5px]"
                      onClick={logOut}
                    >
                      Logout
                    </Button>
                  </div>
                )}
                <p className="text-[.7rem] text-gray-500">{userEmail}</p>
                <div
                  className="cursor-pointer hover:opacity-80"
                  onClick={() => setIsActive(!isActive)}
                >
                  <Image
                    src="/user.png"
                    alt="User"
                    width={32}
                    height={32}
                    className="w-[2rem] h-[2rem]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <Image
              src={isOpen ? "/is-close.svg" : "/is-open.svg"}
              alt="Toggle Menu"
              width={20}
              height={20}
              className="w-[1rem] h-[1rem]"
            />
          </button>

          {/* Mobile Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-[3.5rem] right-0 bg-white p-4 rounded shadow border z-50 md:hidden">
              {token && tokeni ? (
                <>
                  <p className="text-[.7rem] text-gray-500 mb-2">{userEmail}</p>
                  <Button
                    className="md:w-[10rem] py-[.4rem] bg-secondary text-[.75rem] font-medium"
                    onClick={logOut}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Button
                    className="bg-secondary text-[.6rem] px-[2rem] font-normal text-gray-600 bg-white border border-gray-200 rounded"
                    onClick={() => {
                      setIsOpen(false);
                      route.push("/register");
                    }}
                  >
                    Buat Akun
                  </Button>
                  <Button
                    className="bg-secondary w-full text-[.6rem] font-medium text-black rounded"
                    onClick={() => {
                      setIsOpen(false);
                      route.push("/login");
                    }}
                  >
                    Masuk
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Spacer div to offset navbar height */}
      {/* <div className="h-16" /> */}
    </>
  );
}
