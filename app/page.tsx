"use client";

import Image from "next/image";
import Button from "./component/buttons/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number[]>([]); // Array of opened indexes

  const toggleDropdown = (index: number) => {
    setOpenIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "Kenapa CV Penting?",
      answer:
        "CV penting karena menjadi dokumen pertama yang dilihat oleh recruiter. CV yang baik meningkatkan peluang dipanggil interview.",
    },
    {
      question: "Apakah bisa bikin CV di PDF",
      answer:
        "Kamu bisa buat CV di word dan simpan dalam format PDF atau tinggal lengkapi informasi diri di website ini (buatcv.id) tinggal download, formatnya sudah PDF",
    },
    {
      question: "Bikin CV pakai aplikasi apa?",
      answer:
        "Beberapa aplikasi yang sering dipakai untuk buat CV di HP adalah Canva dan Microsoft Word, tapi dengan adanya buatcv.id kamu bisa buat cv lebih mudah lagi, karena tidak perlu skill desain dan skill mengetik di word kamu bisa buat CV dengan lebih cepat, tinggal lengkapi data diri lalu download",
    },
    {
      question: "Di mana saya bisa menulis CV gratis?",
      answer:
        "Kebanyakan orang menggunakan canva dan word, tapi kami punya alternatif lain yaitu buatcv.id, aplikasi website yang lebih mudah digunakan daripada canva dan word karena khusus dibuat untuk memudahkan teman-teman membuat CV yang terarah dan ramah ATS (sistem yang digunakan HR untuk mengsortir CV secara otomatis)",
    },
    // Tambah lagi kalau mau
  ];

  useEffect(() => {
    localStorage.removeItem("step");
  }, []);

  const selectTemplate = (buttonId: string) => {
    localStorage.setItem("is_new", "false");
    setActiveButton(buttonId); // Mark which button was clicked
    setLoading(true);
    route.push("/pilih-template");
  };
  return (
    <div className="min-h-screen relative p-[1rem]">
      {/* section one */}
      <section className="w-full relative bg-white rounded-md md:py-[7rem] overflow-hidden">
        <div className="absolute h-full w-full z-[1] bottom-0 left-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(31,197,120,0.5)_0%,_rgba(31,197,120,0)_80%)] opacity-40 pointer-events-none" />
        {/* Yellow Radial Bottom Right */}
        <div className="absolute h-full w-full z-[1] bottom-0 right-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,0,0.4)_0%,_rgba(255,255,0,0)_80%)] opacity-40 pointer-events-none" />
        <div className="flex justify-center">
          <div className="flex items-center justify-center">
            <div className="text-center md:text-center space-y-[1rem] mt-[6rem] md:mt-0">
              <div>
                <h1 className="tracking-tighter font-sans md:text-[3rem] text-[2.001rem] font-normal leading-[1.3] text-accent tracking-tigh text-xl md:leading-[1.2] w-full text-center md:pt-[2rem]">
                  Bingung Buat CV Mulai <br />
                  dari Mana?
                </h1>
                <div className="w-full justify-center flex">
                  <p className="md:text-[.8rem] text-[.6rem] py-[.5rem] px-[1rem] text-accent text-center w-[70%] opacity-50">
                    Kami akan membantumu buat CV profesional dalam hitungan
                    menit, tanpa ribet dan bisa dicoba gratis.
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <div className="md:w-full w-[70%]">
                  <Button
                    className="font-medium md:px-[5rem] md:py-[.6rem] bg-secondary md:w-[40%] w-[60%] py-0 px-0"
                    loading={activeButton === "hero"}
                    disabled={!activeButton ? false : true}
                    onClick={() => selectTemplate("hero")}
                  >
                    Coba Dulu
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center md:py-[1rem] mt-[1rem]">
          <div className="w-[80%] bg-white z-100 p-[2rem] rounded-[20px] border-[#E9E9E9] border-[1px]">
            <Image
              src="/hero.png"
              alt=""
              width={1000}
              height={1000}
              className="w-full"
            />
          </div>
        </div>
      </section>
      {/* section 2 */}
      <section className="w-full py-[3rem] relative text-accent ">
        <div className="space-y-[1rem] flex justify-center">
          <div className="space-y-[.7rem]">
            <div className="w-full justify-center flex">
              <div className="w-[50%] bg-white md:text-[.8rem] text-[.6rem] border-[1px] rounded-full py-[.5rem] px-[1rem] text-accent text-center">
                Pertanyaan
              </div>
            </div>
            <h2 className="md:text-[1.8rem] text-[1.3rem] text-accent tracking-tighter font-medium text-center">
              Pernah Rasakan Masalah Ini?
            </h2>
          </div>
        </div>
        <div className="w-full justify-center flex py-[2rem]">
          <div className="w-[80%] grid md:grid-cols-3 grid-cols-1 gap-[1.5rem]">
            <div className=" py-[1.5rem] px-[1.8rem] rounded-[20px] border-[#E9E9E9] border-[1px] bg-white">
              <h3 className="md:text-[1.3rem] text-[.8rem] tracking-tighter">
                Kirim Banyak CV Ke Banyak Perusahaan
              </h3>
              <Image
                src="/landing-page/1.png"
                alt=""
                width={1000}
                height={1000}
                className="py-[2rem]"
              />
              <p className="text-[.5rem]">
                Ada Peluang Kerjaan Baru Tapi CV Belum Update
              </p>
            </div>
            <div className="py-[1.5rem] px-[1.8rem] rounded-[20px] border-[#E9E9E9] border-[1px] bg-white">
              <h3 className="md:text-[1.3rem] text-[.8rem] tracking-tighter">
                Mau Update CV Tapi Tidak Punya Waktu
              </h3>
              <Image
                src="/landing-page/3.png"
                alt=""
                width={1000}
                height={1000}
                className="py-[2rem]"
              />
              <p className="text-[.5rem]">
                Sudah Kirim Banyak CV Tapi Belum Dipanggil Interview
              </p>
            </div>
            <div className="py-[1.5rem] px-[1.8rem] rounded-[20px] border-[#E9E9E9] border-[1px] bg-white">
              <h3 className="md:text-[1.3rem] text-[.8rem] tracking-tighter">
                Mau Buat CV Tapi Bingung Diisi Apa
              </h3>
              <Image
                src="/landing-page/2.png"
                alt=""
                width={1000}
                height={1000}
                className="py-[2rem]"
              />
              <p className="text-[.5rem]">
                Mau mulai buat CV tapi bingung mau isi apa, susunan kalimat yang
                menarik.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* section template */}
      <section className="w-full py-[3rem] relative text-accent ">
        <div className="space-y-[1rem] flex justify-center">
          <div className="space-y-[.7rem]">
            <div className="w-full justify-center flex">
              <div className="w-[50%] bg-white text-[.8rem] border-[1px] rounded-full py-[.5rem] px-[1rem] text-accent text-center">
                Template
              </div>
            </div>
            <h2 className="md:text-[1.8rem] text-[1.3rem] text-accent tracking-tighter font-medium ">
              Berikut Template Kami
            </h2>
          </div>
        </div>
        <div className="w-full justify-center flex md:py-[3.5rem] py-[1rem]">
          <div className="w-[80%]">
            <div className="grid md:grid-cols-2 text-[.8rem] gap-[2rem]">
              <div className="p-[1rem] bg-white bg-opacity-5 border rounded-[20px] shadow-md overflow-hidden group">
                <Image
                  src="/template/1.jpg"
                  alt="Template Preview"
                  width={1000}
                  height={1000}
                  className="w-full h-auto rounded-[20px] object-cover md:block transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="p-[1rem] bg-white bg-opacity-5 border rounded-[20px] shadow-md overflow-hidden group">
                <Image
                  src="/template/2.jpg"
                  alt="Template Preview"
                  width={1000}
                  height={1000}
                  className="w-full h-auto rounded-[20px] object-cover md:block transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* section 3 */}
      <section className="w-full py-[3rem] relative text-accent ">
        <div className="space-y-[1rem] flex justify-center">
          <div className="space-y-[.7rem]">
            <div className="w-full justify-center flex">
              <div className="w-[50%] bg-white text-[.8rem] border-[1px] rounded-full py-[.5rem] px-[1rem] text-accent text-center">
                Fitur
              </div>
            </div>
            <h2 className="md:text-[1.8rem] text-[1.3rem]  text-accent tracking-tighter font-medium ">
              Berikut Fitur-fitur Kami
            </h2>
          </div>
        </div>
        <div className="w-full justify-center flex md:py-[3.5rem] py-[1rem]">
          <div className="w-[80%]">
            <div className="grid md:grid-cols-2 text-[.8rem] gap-[2rem]">
              <Image
                src="/landing-page/4.png"
                alt=""
                width={1000}
                height={1000}
                className="flex md:hidden"
              />
              <div className="space-y-[2.5rem]">
                <div className="flex space-x-[1rem]">
                  <div className="w-4 h-4 border border-[#E9E9E9] flex items-center justify-center rounded-sm text-xs text-green-600">
                    ✓
                  </div>
                  <p>Buat Banyak CV Dengan Mudah dan Cepat</p>
                </div>
                <div className="flex space-x-[1rem]">
                  <div className="w-4 h-4 border border-[#E9E9E9] flex items-center justify-center rounded-sm text-xs text-green-600">
                    ✓
                  </div>
                  <p>Pilih Template Yang ATS Friendly</p>
                </div>
                <div className="flex space-x-[1rem]">
                  <div className="w-4 h-4 border border-[#E9E9E9] flex items-center justify-center rounded-sm text-xs text-green-600">
                    ✓
                  </div>
                  <p>Simpan DAN Edit CV Kapan Saja</p>
                </div>
                <div className="flex space-x-[1rem]">
                  <div className="w-4 h-4 border border-[#E9E9E9] flex items-center justify-center rounded-sm text-xs text-green-600">
                    ✓
                  </div>
                  <p>Diberi Masukan Oleh AI</p>
                </div>
                <div className="flex space-x-[1rem]">
                  <div className="w-4 h-4 border border-[#E9E9E9] flex items-center justify-center rounded-sm text-xs text-green-600">
                    ✓
                  </div>
                  <p>Upload CV Lama Langsung Edit</p>
                </div>
              </div>
              <Image
                src="/landing-page/4.png"
                alt=""
                width={1000}
                height={1000}
                className="md:flex hidden"
              />
            </div>
          </div>
        </div>
      </section>
      {/* section 4 */}
      <section className="w-full py-[3rem] relative text-accent ">
        <div className="w-full justify-center flex md:py-[3.5rem] py-[1rem]">
          <div className="w-[80%]">
            <div className="grid md:grid-cols-2 text-[.8rem]">
              <div className="space-y-[2rem]">
                <div className="w-full md:justify-left justify-center flex md:justify-start">
                  <div className="w-[50%] bg-white text-[.8rem] border-[1px] rounded-full py-[.5rem] px-[1rem] text-accent text-center">
                    Pertanyaan
                  </div>
                </div>
                <div>
                  <h2 className="md:text-[1.8rem] text-[1.3rem] text-accent tracking-tighter font-medium md:text-left text-center">
                    Hal Yang Sering Ditanyakan
                  </h2>
                  <p className="md:text-left text-center md:py-0 py-[1rem]">
                    Temukan Jawaban Dari Pertanyaan-pertanyaanmu
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-[1rem] mt-[2rem] md:mt-0">
                {faqData.map((item, index) => {
                  const isOpen = openIndex.includes(index);
                  return (
                    <div
                      key={index}
                      className="transition-all duration-300 rounded-[20px] shadow-md overflow-hidden border border-[#D7D7D7] bg-gradient-to-tl from-gray-100 to-white"
                    >
                      {/* Header */}
                      <div
                        onClick={() => toggleDropdown(index)}
                        className="flex justify-between items-center px-[2rem] py-[1rem] cursor-pointer bg-transparent"
                      >
                        <p className="font-medium">{item.question}</p>
                        <Image
                          src="/landing-page/plus-faq.png"
                          alt="Toggle Icon"
                          width={500}
                          height={500}
                          className={`w-[1.5rem] transition-transform duration-300 ${
                            isOpen ? "rotate-45" : "rotate-0"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div
                        className={`transition-all duration-300 bg-transparent px-[2rem] md:text-sm text-[.8rem] text-gray-600 overflow-hidden ${
                          isOpen ? "max-h-[200px] py-[1rem]" : "max-h-0 py-0"
                        }`}
                      >
                        {item.answer}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-t from-[#b3ffdb] background-opacity-0 to-[#E6FBF1] px-[2rem] flex justify-center py-[5rem] rounded-md">
        <div>
          <div className="w-full md:justify-left justify-center flex">
            <div className="md:w-[25%] bg-white md:text-[.8rem] border-[1px] rounded-full py-[.5rem] px-[1rem] text-accent text-center">
              Mulai buat CV
            </div>
          </div>
          <div className="py-[2rem] w-full flex justify-center">
            <h2 className="md:text-[1.8rem] text-[1.5rem] text-accent tracking-tighter font-medium text-center md:w-[70%]">
              Dapatkan Pekerjaan Impianmu Dengan CV Yang Lebih Siap
            </h2>
          </div>
          <div className="w-full justify-center flex">
            <Button
              className="font-medium px-[5rem] py-[.6rem] bg-secondary"
              loading={activeButton === "last"}
              disabled={!activeButton ? false : true}
              onClick={() => selectTemplate("last")}
            >
              Coba Dulu
            </Button>
          </div>
        </div>
      </section>
      {/* section six */}
      {/* <section className="w-full flex justify-center space-y-[5rem] py-[2rem] relative">
        <div className="w-[80%] relative flex space-x-[2rem]">
          <div className="w-full space-y-[2rem]">
            <h2 className="md:text-[2rem] text-[1rem] leading-[1.2sssss] w-full font-medium text-accent text-center">
              Silahkan Pilih Paket
            </h2>
            <div className="w-full grid md:grid-cols-3 gap-[1rem] items-stretch">
              <div
                className="flex flex-col justify-between h-full space-y-[2rem] px-[2rem] rounded-md bg-white z-[2] shadow-md py-[3rem] transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                style={{ boxShadow: "1px 1px 15px 1px rgba(0, 0, 0, 0.06)" }}
              >
                <div className="space-y-[2rem]">
                  <div className="w-full flex justify-center">
                    <div className="space-y-[1rem]">
                      <p className="w-full text-center text-[.7rem] line-through font-bold">
                        Rp 10.000
                      </p>
                      <h3 className="text-accent w-full text-center font-semibold text-[2rem]">
                        Gratis
                      </h3>
                    </div>
                  </div>
                  <div className="text-[.8rem] space-y-[1rem] text-gray-500">
                    <div className="flex justify-between items-center">
                      <p>Templet Gratis</p>
                      <span>
                        <Image
                          src="/check.png"
                          alt=""
                          width={500}
                          height={500}
                          className="w-[1rem]"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Bisa Download Gratis</p>
                      <span>
                        <Image
                          src="/check.png"
                          alt=""
                          width={500}
                          height={500}
                          className="w-[1rem]"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <Button>Coba</Button>
              </div>
              the center
              <div
                className="space-y-[2rem] px-[2rem] rounded-md bg-secondary z-[2] shadow-md py-[3rem] transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                style={{ boxShadow: "1px 1px 15px 1px rgba(0, 0, 0, 0.06)" }}
              >
                <div className="w-full flex justify-center">
                  <div className="space-y-[1rem]">
                    <p className="w-full text-center text-[.7rem] line-through font-bold text-white">
                      Rp 15.000
                    </p>
                    <h3 className="text-white w-full text-center font-semibold text-[2rem] ">
                      Gratis
                    </h3>
                  </div>
                </div>
                <div className="text-[.8rem] space-y-[1rem] text-white">
                  <div className="flex justify-between items-center">
                    <p>Templet Gratis</p>
                    <span>
                      <Image
                        src="/check-white.png"
                        alt=""
                        width={500}
                        height={500}
                        className="w-[1rem]"
                      />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Bisa Download Gratis</p>
                    <span>
                      <Image
                        src="/check-white.png"
                        alt=""
                        width={500}
                        height={500}
                        className="w-[1rem]"
                      />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Hasil Download HD</p>
                    <span>
                      <Image
                        src="/check-white.png"
                        alt=""
                        width={500}
                        height={500}
                        className="w-[1rem]"
                      />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Buat Lebih Dari SatU CV</p>
                    <span>
                      <Image
                        src="/check-white.png"
                        alt=""
                        width={500}
                        height={500}
                        className="w-[1rem]"
                      />
                    </span>
                  </div>
                </div>
                <Button className="bg-white">Coba</Button>
              </div>
              <div
                className="flex flex-col justify-between h-full space-y-[2rem] px-[2rem] rounded-md bg-white z-[2] shadow-md py-[3rem] transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                style={{ boxShadow: "1px 1px 15px 1px rgba(0, 0, 0, 0.06)" }}
              >
                <div className="space-y-[2rem]">
                  <div className="w-full flex justify-center">
                    <div className="space-y-[1rem]">
                      <p className="w-full text-center text-[.7rem] line-through font-bold">
                        Rp 13.000
                      </p>
                      <h3 className="text-accent w-full text-center font-semibold text-[2rem]">
                        Gratis
                      </h3>
                    </div>
                  </div>
                  <div className="text-[.8rem] space-y-[1rem] text-gray-500">
                    <div className="flex justify-between items-center">
                      <p>Templet Gratis</p>
                      <span>
                        <Image
                          src="/check.png"
                          alt=""
                          width={500}
                          height={500}
                          className="w-[1rem]"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Bisa Download Gratis</p>
                      <span>
                        <Image
                          src="/check.png"
                          alt=""
                          width={500}
                          height={500}
                          className="w-[1rem]"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Live Preview</p>
                      <span>
                        <Image
                          src="/check.png"
                          alt=""
                          width={500}
                          height={500}
                          className="w-[1rem]"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <Button>Coba</Button>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="w-full flex justify-center space-y-[5rem] py-[5rem] relative">
        <div className="w-[80%] relative flex space-x-[2rem]">
          <div className="w-full space-y-[1rem]">
            <h2 className="md:text-[2rem] text-[1rem] leading-[1.3] w-full font-medium text-accent text-center">
              Buat CV Dengan Cepat Sekarang
            </h2>
            <p className="w-full text-center text-gray-500">
              langsung download, dan sudah disesuaikan agar ATS friendly
            </p>
            <div className="w-full flex justify-center">
              <div className="md:w-[20%]-full">
                <Button className="text-[.8rem]">Coba Gratis Sekarang</Button>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
