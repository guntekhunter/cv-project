"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const route = useRouter();
  return (
    <div className="w-full flex justify-center py-[2rem] bg-white">
      <div className="md:w-[80%] w-[90%] grid grid-cols-3">
        <div
          className="font-bold text-accent md:text-[1rem] text-[.8rem] cursor-pointer flex items-start space-x-[.5rem]"
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
        <div className="space-y-[.5rem]">
          <h4 className="text-[.8rem] duration-300 ease-out font-bold">
            Halaman
          </h4>
          <div className="block">
            <Link
              href={"/buat-cv"}
              className="text-[.8rem] hover:text-secondary duration-300 ease-out"
            >
              Buat cv
            </Link>
          </div>
          <div className="block">
            <Link
              href={"/login"}
              className="text-[.8rem] hover:text-secondary duration-300 ease-out"
            >
              Masuk
            </Link>
          </div>
          <div className="block">
            <Link
              href={"/signup"}
              className="text-[.8rem] hover:text-secondary duration-300 ease-out"
            >
              Daftar
            </Link>
          </div>
        </div>
        <div className="space-y-[.5rem]">
          <h4 className="text-[.8rem] duration-300 ease-out font-bold">
            Created by
          </h4>
          <div className="block">
            <Link
              href={
                "https://portfolio-git-main-guntekhunters-projects.vercel.app/"
              }
              className="text-[.8rem] hover:text-secondary duration-300 ease-out"
            >
              Founder
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
