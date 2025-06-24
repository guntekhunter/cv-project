"use client";

import Image from "next/image";
import Button from "./component/buttons/Button";

export default function Home() {
  return (
    <div className="w-full flex justify-center min-h-screen relative bg-white ">
      {/* section one */}
      <section className="w-[80%] py-[2rem] grid grid-cols-2">
        {/* left */}
        <div className="space-y-[2rem]">
          <h1 className="text-[3rem] font-bold leading-[1.3]">
            Buat CV Cepat Pakai HP, Dan Laptop
          </h1>

          <p className="text-[.8rem]">
            Bikin CV profesional langsung dari HP kamu tanpa ribet. Desain
            menarik, mudah diisi, dan siap kirim hanya dalam hitungan menit,
            langsung siap print
          </p>
          <div className="w-full">
            <div className="w-[50%]">
              <Button>Coba Gratis!</Button>
            </div>
          </div>
        </div>

        <Image
          src="/thumbnail.png"
          alt=""
          width={500}
          height={500}
          className="w-full"
        />
        {/* right */}
        <div></div>
      </section>
    </div>
  );
}
