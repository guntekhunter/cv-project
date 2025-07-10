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
  const [loadingId, setLoadingId] = useState<number | null>(null);

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

  const handleDetail = async (id: number) => {
    console.log("idnya", id);
    setLoadingId(id);
    try {
      // simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // once you're ready to navigate:
      route.push(`/preview/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId(null); // reset when done
    }
  };

  console.log(loadingId, "loading id");

  return (
    <div className="w-full flex justify-center min-h-screen relative">
      <div className="w-full min-h-screen border border-[#F6F6F6] text-[#777777] bg-white flex justify-center">
        <div className="text-black py-4 grid md:grid-cols-5 grid-cols-2 grid-rows-3 text-[.5rem] gap-[1rem] w-[80%]">
          {cv?.length > 0 ? (
            cv.map((item: any) => (
              <div
                key={item.id}
                onClick={() => handleDetail(item.id)}
                className="cursor-pointer rounded-[10px] px-[1.3rem] py-[1rem] border border-[#f4f4f4] shadow-md flex flex-col relative"
              >
                {loadingId === item.id && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-[10px]">
                    <span className="text-sm text-gray-700">Loading...</span>
                  </div>
                )}

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
                  <Button disabled={loadingId === item.id}>Download</Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Belum ada CV.</p>
          )}

          <div
            className={`cursor-pointer w-full rounded-md border-[1.5px] border-dashed border-[#dfdfdf] justify-around flex align-middle items-center
          hover:bg-[#ffe9e9]`}
            onClick={() => route.push("/pilih-template")}
          >
            <img src="/plus.png" alt="" className="w-[1.5rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
