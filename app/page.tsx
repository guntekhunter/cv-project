"use client";

import Image from "next/image";
import Button from "./component/buttons/Button";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-white">
      {/* section one */}
      <section className="w-full flex justify-center relative">
        <div className="absolute h-full w-full z-[10] top-0 bg-[radial-gradient(ellipse_at_center,_rgba(31,197,120,0.9)_0%,_rgba(31,197,120,0)_70%)] opacity-20"></div>
        <div className="w-[80%] grid grid-cols-2 my-[4rem]">
          {/* left */}
          <div className="flex items-center justify-center">
            <div className="space-y-[2rem]">
              <h1 className="text-[3rem] font-bold leading-[1.3] text-accent">
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
      <section className="w-full flex justify-center space-y-[5rem] py-[5rem] relative">
        <div className="w-[80%] relative">
          <div className="absolute h-full w-full z-[1] top-0 bg-[radial-gradient(ellipse_at_center,_rgba(31,197,120,0.9)_0%,_rgba(31,197,120,0)_70%)] opacity-20"></div>
          <div className="w-full justify-center flex">
            <h1 className="text-[2rem] leading-[1.3] w-[40%] text-center font-medium text-accent">
              Pernah Merasakan Masalah Dibawah?
            </h1>
          </div>
          <div className="py-[2rem]">
            <div className="grid grid-cols-3 gap-[2rem]">
              {/* card */}
              <div className="space-y-[2rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]">
                <div className="w-full flex justify-center">
                  <Image
                    src={"/bag.png"}
                    alt={""}
                    width={500}
                    height={500}
                    className="w-[30%]"
                  />
                </div>
                <div className="space-y-[1rem]">
                  <h3 className="text-accent font-bold w-full text-accent">
                    Lowongan Datang Tiba-tiba, CV Belum Siap
                  </h3>
                  <p className="text-[.7rem]">
                    Dapat info lowongan menarik, tapi belum punya CV up-to-date.
                  </p>
                </div>
              </div>
              {/* card */}
              <div className="space-y-[2rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]">
                <div className="w-full flex justify-center">
                  <Image
                    src={"/clock.png"}
                    alt={""}
                    width={500}
                    height={500}
                    className="w-[30%]"
                  />
                </div>
                <div className="space-y-[1rem]">
                  <h3 className="text-accent font-bold w-full text-accent">
                    Bikin CV itu ribet & makan waktu
                  </h3>
                  <p className="text-[.7rem]">
                    Harus buka Word, cari template, mikir nulisnya—lama dan
                    membingungkan.
                  </p>
                </div>
              </div>
              {/* card */}
              <div className="space-y-[2rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]">
                <div className="w-full flex justify-center">
                  <Image
                    src={"/confuse.png"}
                    alt={""}
                    width={500}
                    height={500}
                    className="w-[30%]"
                  />
                </div>
                <div className="space-y-[1rem]">
                  <h3 className="text-accent font-bold w-full">
                    Tidak pede sama tampilan atau isian CV
                  </h3>
                  <p className="text-[.7rem]">
                    Takut CV-nya kurang menarik atau gak sesuai standar HR
                  </p>
                </div>
              </div>
              {/* card */}
              <div className="space-y-[2rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]">
                <div className="w-full flex justify-center">
                  <Image
                    src={"/document.png"}
                    alt={""}
                    width={500}
                    height={500}
                    className="w-[30%]"
                  />
                </div>
                <div className="space-y-[1rem]">
                  <h3 className="text-accent font-bold w-full">
                    Butuh CV dalam berbagai versi
                  </h3>
                  <p className="text-[.7rem]">
                    Mau apply kerja, beasiswa, magang, semua butuh format yang
                    beda-beda.
                  </p>
                </div>
              </div>
              {/* card */}
              <div className="space-y-[2rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]">
                <div className="w-full flex justify-center">
                  <Image
                    src={"/bag.png"}
                    alt={""}
                    width={500}
                    height={500}
                    className="w-[30%]"
                  />
                </div>
                <div className="space-y-[1rem]">
                  <h3 className="text-accent font-bold w-full">
                    Belum punya pengalaman, bingung nulis CV
                  </h3>
                  <p className="text-[.7rem]">
                    Dapat info lowongan menarik, tapi belum punya CV up-to-date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section className="w-full flex justify-center space-y-[5rem] py-[2rem] relative">
        <div className="w-[80%] relative flex space-x-[2rem]">
          <div className="w-[30%] space-y-[1rem]">
            <h2 className="text-[2rem] leading-[1.3] w-[full] font-medium text-accent">
              Fitur Unggulan
            </h2>
            <p className="text-[.8rem]">
              langsung download, dan sudah disesuaikan agar ATS friendly
            </p>
          </div>
          <div className="w-[70%] grid grid-rows-6 gap-[1rem]">
            <div className="space-y-[1rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]">
              <h3 className="font-bold text-accent">
                Template modern & ATS friendly
              </h3>
              <p className="text-[.7rem]">
                ATS (Sistem Pelacak Pelamar), HRD sering kali menggunakan alat
                ini untuk menyaring secara otomatis cv-cv yang tidak sesuai
                kualifikasi pekerjaan
              </p>
            </div>
            <div className="space-y-[1rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]">
              <h3 className="font-bold text-accent">
                Panduan isi CV untuk pemula
              </h3>
              <p className="text-[.7rem]">
                Tersedia langkah-langkah dan hal yang perlu diperhatikan dalam
                membuat CV
              </p>
            </div>
            <div className="space-y-[1rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]">
              <h3 className="font-bold text-accent">
                Simpan dan edit kapan saja
              </h3>
              <p className="text-[.7rem]">
                CVmu akan tersimpan jadi kamu bisa mengedit dan ubah sedikit
                datanya sesuai dengan tempatmu melamar
              </p>
            </div>
            <div className="space-y-[1rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]">
              <h3 className="font-bold text-accent">Download PDF langsung</h3>
              <p className="text-[.7rem]">
                Bisa langsung Download Hasil CV yang dibuat
              </p>
            </div>
            <div className="space-y-[1rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]">
              <h3 className="font-bold text-accent">
                Template modern & ATS friendly
              </h3>
              <p className="text-[.7rem]">
                ATS (Sistem Pelacak Pelamar), HRD sering kali menggunakan alat
                ini untuk menyaring secara otomatis cv-cv yang tidak sesuai
                kualifikasi pekerjaan
              </p>
            </div>
            <div className="space-y-[1rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]">
              <h3 className="font-bold text-accent">
                Template modern & ATS friendly
              </h3>
              <p className="text-[.7rem]">
                ATS (Sistem Pelacak Pelamar), HRD sering kali menggunakan alat
                ini untuk menyaring secara otomatis cv-cv yang tidak sesuai
                kualifikasi pekerjaan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section five */}
      <section className="w-full flex justify-center space-y-[5rem] py-[2rem] relative">
        <div className="w-[80%] relative flex space-x-[2rem]">
          <div className="w-full space-y-[2rem]">
            <h2 className="text-[2rem] leading-[1.3] w-full font-medium text-accent text-center">
              Cara Buat CV di Web Ini
            </h2>
            <div className="grid grid-cols-3 gap-[1rem]">
              <div className="space-y-[1rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]"></div>
              <div className="space-y-[1rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]"></div>
              <div className="space-y-[1rem] p-[2rem] border-[1.4px] border-[#A1A1A1] rounded-md border-opacity-25 bg-white z-[2]"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center space-y-[5rem] py-[5rem] relative">
        <div className="w-[80%] relative flex space-x-[2rem]">
          <div className="w-full space-y-[2rem]">
            <h2 className="text-[2rem] leading-[1.3] w-full font-medium text-accent text-center">
              Buat CV Dengan Cepat
            </h2>
            <p className="w-full text-center text-gray-500">
              langsung download, dan sudah disesuaikan agar ATS friendly
            </p>
            <div className="w-full flex justify-center">
              <div className="w-[20%]">
                <Button className="text-[.8rem]">Coba Gratis Sekarang</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
