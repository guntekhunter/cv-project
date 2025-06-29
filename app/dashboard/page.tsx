"use client";

import { useEffect, useState } from "react";
import Button from "../component/buttons/Button";
import { getCvs } from "../fetch/get/fetch";
import { useRouter } from "next/navigation";

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [cv, setCv] = useState<any[]>([]);

  const route = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);

    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        console.log("objnya", userObj);
        setUserId(userObj || null);
        setUserEmail(userObj?.email || null);
      } catch (e) {
        console.error("Invalid user data in localStorage:", e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const res = await getCvs(userId);
        console.log(res);
        console.log(userId);
        setCv(res?.data.cv);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("ahhay");
      }
    };
    fetchCvs();
  }, [userId]);

  console.log(cv);

  return (
    <div className="w-full flex justify-center min-h-screen relative">
      <div className="w-full min-h-screen border border-[#F6F6F6] text-[#777777] grid grid-cols-[20%_80%] bg-white">
        <div className="border-r-[1.4px] border-[#f4f4f4]"></div>
        <div className="text-black p-4 grid grid-cols-5 grid-rows-2 text-[.5rem] gap-[1rem]">
          {cv?.length > 0 ? (
            cv.map((item: any, index: number) => (
              <div
                key={item.id} // ✅ Use item.id instead of index if it's unique
                onClick={() => route.push(`/preview/${item.id}`)} // ✅ add slash before preview
                className="cursor-pointer rounded-[10px] px-[1.3rem] py-[1rem] border border-[#f4f4f4] shadow-md flex flex-col"
              >
                <div className="mb-2 text-sm font-semibold text-gray-800">
                  CV ID: {item.id}
                </div>
                <div className="mb-2 text-sm font-semibold text-gray-800">
                  nama: {item?.personal_data?.name}
                </div>
                <div className="text-xs text-gray-500">
                  Dibuat pada:{" "}
                  {new Date(item.createdAt).toLocaleDateString("id-ID")}
                </div>
                <div className="mt-auto pt-4">
                  <Button>Download</Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Belum ada CV.</p>
          )}

          <div
            className={`cursor-pointer w-full rounded-md border-[1.5px] border-dashed border-[#dfdfdf] justify-around flex align-middle items-center
          hover:bg-[#ffe9e9]`}
            onClick={() => route.push("/buat-cv")}
          >
            <img src="/plus.png" alt="" className="w-[1.5rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
