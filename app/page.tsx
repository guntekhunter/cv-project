"use client";

import Image from "next/image";
import Button from "./component/buttons/Button";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-white ">
      {/* section one */}
      <section className="w-full flex justify-center">
        <div className="w-[80%] grid grid-cols-2 my-[4rem]">
          {/* left */}
          <div className="flex items-center justify-center">
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
          </div>
          <div className="flex justify-end">
            <Image
              src="/thumbnail.png"
              alt=""
              width={500}
              height={500}
              className="w-[80%]"
            />
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="w-full flex justify-center space-y-[5rem] py-[5rem]">
        <div className="w-[80%]">
          <div className="w-full justify-center flex">
            <h1 className="text-[2rem] leading-[1.3] w-[40%] text-center font-normal">
              Pernah Merasakan Masalah Dibawah?
            </h1>
          </div>
          <div className="py-[2rem] bg-red-400">
            <div className="grid grid-cols-3 gap-[2rem]">
              <div className="bg-green-400">alsd</div>
              <div className="bg-green-400">alsd</div>
              <div className="bg-green-400">alsd</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
